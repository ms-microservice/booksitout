package com.jinkyumpark.bookitout.user.oauth.google;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleUserInfo {
    private final String sub;
    private final String name;
    private final String givenName;
    private final String familyName;
    private final String picture;
    private final String email;
    private final String emailVerified;
    private final String locale;
}