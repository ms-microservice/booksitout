package com.jinkyumpark.bookitout.user.oauth.google;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GoogleToken {
    private String accessToken;
    private Integer expiresIn;
    private String scope;
    private String tokenType;
    private String idToken;
}
