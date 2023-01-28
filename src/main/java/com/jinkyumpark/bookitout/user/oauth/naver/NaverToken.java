package com.jinkyumpark.bookitout.user.oauth.naver;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class NaverToken {
    private final String accessToken;
    private final String refreshToken;
    private final String tokenType;
    private final String expiresIn;
}