package com.jinkyumpark.bookitout.user.oauth.facebook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Builder
@Getter
public class FacebookToken {
    private String accessToken;
    private String tokenType;
    private Integer expiresIn;
}
