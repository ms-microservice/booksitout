package com.jinkyumpark.bookitout.user.oauth.naver;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NaverToken {
    private final String accessToken;
    private final String refreshToken;
    private final String tokenType;
    private final String expiresIn;
}