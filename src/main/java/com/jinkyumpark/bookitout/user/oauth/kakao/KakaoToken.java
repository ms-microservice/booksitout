package com.jinkyumpark.bookitout.user.oauth.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoToken {
    private final String accessToken;
    private final String tokenType;
    private final String refreshToken;
    private final String idToken;
    private final Integer expiresIn;
    private final String scope;
    private final Integer refreshTokenExpiresIn;
}