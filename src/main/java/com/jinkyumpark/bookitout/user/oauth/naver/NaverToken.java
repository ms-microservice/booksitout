package com.jinkyumpark.bookitout.user.oauth.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class NaverToken {
    @JsonProperty("access_token")
    private final String accessToken;
    @JsonProperty("refresh_token")
    private final String refreshToken;
    @JsonProperty("token_type")
    private final String tokenType;
    @JsonProperty("expires_in")
    private final String expiresIn;
}