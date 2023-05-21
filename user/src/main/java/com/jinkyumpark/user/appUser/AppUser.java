package com.jinkyumpark.user.appUser;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.user.appUser.dto.AppUserDto;
import com.jinkyumpark.user.config.TimeEntity;
import com.jinkyumpark.user.oauth.OAuthDto;
import com.jinkyumpark.user.oauth.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor @NoArgsConstructor @Builder

@DynamicInsert
@DynamicUpdate

@Entity
@Table(name = "app_user",
        uniqueConstraints = {
                @UniqueConstraint(name = "app_user_email_unique", columnNames = "email"),
                @UniqueConstraint(name = "app_user_public_name_unique", columnNames = "publicName")
        })
public class AppUser extends TimeEntity implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appUserId;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password;
    private String name;
    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(10) DEFAULT 'NOT_USING'")
    private OAuthProvider oAuthProvider;
    private String oAuthId;

    @JsonIgnore
    private Integer emailVerificationCode;

    @JsonIgnore
    private String roles;

    private String publicName;
    private String publicProfileImage;

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (roles == null) return List.of(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return "ROLE_USER";
            }
        });

        return Arrays.stream(roles.split(","))
                .filter(r -> !r.isBlank())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public AppUser updateUser(AppUserDto appUserDto) {
        if (appUserDto.getEmail() != null) {
            this.email = appUserDto.getEmail();
        }

        if (appUserDto.getPassword() != null) {
            this.password = appUserDto.getPassword();
        }

        if (appUserDto.getEmailVerificationCode() != null) {
            this.emailVerificationCode = appUserDto.getEmailVerificationCode();
        }

        if (appUserDto.getName() != null) {
            this.name = appUserDto.getName();
        }

        return this;
    }

    public void saveOrUpdateOAuthUser(OAuthDto oauthDto) {

        if (oauthDto.getOAuthId() != null) {
            this.oAuthId = oauthDto.getOAuthId();
        }

        if (oauthDto.getName() != null && (this.name == null || this.name.equals(""))) {
            this.name = oauthDto.getName();
        }

        if (oauthDto.getProfileImage() != null && (this.profileImage == null || this.profileImage.equals(""))) {
            this.profileImage = oauthDto.getProfileImage();
        }

        if (oauthDto.getOAuthProvider() != null) {
            this.oAuthProvider = oauthDto.getOAuthProvider();
        }

        if (this.publicProfileImage == null) {
            this.publicProfileImage = oauthDto.getProfileImage();
        }

    }

    public AppUser updatePublicProfile(String name, String profileImage) {
        if (name != null) {
            this.publicName = name;
        }

        if (profileImage != null) {
            this.publicProfileImage = profileImage;
        }

        return this;
    }

}