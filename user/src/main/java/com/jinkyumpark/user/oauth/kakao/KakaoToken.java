package com.jinkyumpark.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class KakaoToken {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("token_type")
    private String tokenType;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("id_token")
    private String idToken;
    @JsonProperty("expires_in")
    private Integer expiresIn;
    private String scope;
    @JsonProperty("refresh_token_expires_in")
    private Integer refreshTokenExpiresIn;
}