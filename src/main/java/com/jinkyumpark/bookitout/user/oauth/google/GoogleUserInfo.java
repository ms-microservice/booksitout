package com.jinkyumpark.bookitout.user.oauth.google;

import com.jinkyumpark.bookitout.user.dto.OAuthDto;
import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class GoogleUserInfo {
    private String sub;
    private String name;
    private String givenName;
    private String familyName;
    private String picture;
    private String email;
    private String emailVerified;
    private String locale;

    public OAuthDto toDto() {
        return OAuthDto.builder()
                .oAuthId(sub)
                .oAuthProvider(OAuthProvider.GOOGLE)
                .email(email)
                .name(name)
                .profileImage(picture)
                .build();
    }
}