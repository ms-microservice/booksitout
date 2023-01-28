package com.jinkyumpark.bookitout.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoToken {
    @JsonProperty("access_token")
    private final String accessToken;
    @JsonProperty("token_type")
    private final String tokenType;
    @JsonProperty("refresh_token")
    private final String refreshToken;
    @JsonProperty("id_token")
    private final String idToken;
    @JsonProperty("expires_in")
    private final Integer expiresIn;
    private final String scope;
    @JsonProperty("refresh_token_expires_in")
    private final Integer refreshTokenExpiresIn;
}