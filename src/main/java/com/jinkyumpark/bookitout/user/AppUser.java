package com.jinkyumpark.bookitout.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.common.jpa.TimeEntity;
import com.jinkyumpark.bookitout.user.dto.AppUserDto;
import com.jinkyumpark.bookitout.user.dto.KakaoDto;
import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.*;
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
    private Long oAuthId;

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
    public AppUser(String email, String password, String name, String profileImage, OAuthProvider oAuthProvider, Long oAuthId, Integer emailVerificationCode) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.profileImage = profileImage;
        this.oAuthProvider = oAuthProvider;
        this.oAuthId = oAuthId;
        this.emailVerificationCode = emailVerificationCode;
    }

    public void updateUser(AppUserDto appUserDto) {
        this.email = appUserDto.getEmail();
        this.password = appUserDto.getPassword();
        this.emailVerificationCode = appUserDto.getEmailVerificationCode();
    }

    public void saveOrUpdateKakao(KakaoDto kakaoDto) {
        if (kakaoDto.getOAuthId() != null) this.oAuthId = kakaoDto.getOAuthId();
        if (kakaoDto.getName() != null) this.name = kakaoDto.getName();
        if (kakaoDto.getProfileImage() != null) this.profileImage = kakaoDto.getProfileImage();
        if (kakaoDto.getOAuthProvider() != null) this.oAuthProvider = kakaoDto.getOAuthProvider();
    }
}