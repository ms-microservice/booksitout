package com.jinkyumpark.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.common.jpa.TimeEntity;
import com.jinkyumpark.user.dto.AppUserDto;
import com.jinkyumpark.user.dto.OAuthDto;
import com.jinkyumpark.user.oauth.OAuthProvider;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@Getter

@DynamicUpdate
@DynamicInsert
@Entity
@Table(name = "app_user", uniqueConstraints = { @UniqueConstraint(name = "app_user_email_unique", columnNames = "email") })
public class AppUser extends TimeEntity implements UserDetails {
    @Id
    @SequenceGenerator(name = "app_user_seq", sequenceName = "app_user_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_user_seq")
    @Column(name = "app_user_id")
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

    @JsonIgnore @Override
    public String getPassword() { return password; }
    @JsonIgnore @Override
    public String getUsername() {
        return email;
    }
    @JsonIgnore @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @JsonIgnore @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonIgnore @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @JsonIgnore @Override
    public boolean isEnabled() { return true; }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @OneToMany(mappedBy = "appUser", cascade = {CascadeType.REMOVE}, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Book> bookList;

    public AppUser(Long appUserId) {
        this.appUserId = appUserId;
    }

    @Builder
    public AppUser(Long appUserId, String email, String password, String name, String profileImage, OAuthProvider oAuthProvider, String oAuthId, Integer emailVerificationCode) {
        this.appUserId = appUserId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.profileImage = profileImage;
        this.oAuthProvider = oAuthProvider;
        this.oAuthId = oAuthId;
        this.emailVerificationCode = emailVerificationCode;
    }

    public void updateUser(AppUserDto appUserDto) {
        if (appUserDto.getEmail() != null) this.email = appUserDto.getEmail();
        if (appUserDto.getPassword() != null) this.password = appUserDto.getPassword();
        if (appUserDto.getEmailVerificationCode() != null) this.emailVerificationCode = appUserDto.getEmailVerificationCode();
        if (appUserDto.getName() != null) this.name = appUserDto.getName();
    }

    public void saveOrUpdateOAuthUser(OAuthDto OAuthDto) {
        if (OAuthDto.getOAuthId() != null) this.oAuthId = OAuthDto.getOAuthId();
        if (OAuthDto.getName() != null && this.name == null) this.name = OAuthDto.getName();
        if (OAuthDto.getProfileImage() != null) this.profileImage = OAuthDto.getProfileImage();
        if (OAuthDto.getOAuthProvider() != null) this.oAuthProvider = OAuthDto.getOAuthProvider();
    }
}