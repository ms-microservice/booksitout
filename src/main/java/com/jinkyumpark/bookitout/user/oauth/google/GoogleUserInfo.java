package com.jinkyumpark.bookitout.user.oauth.google;

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
}