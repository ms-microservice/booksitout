package com.jinkyumpark.bookitout.user.oauth.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoAccount {
    private Profile profile;
    private Boolean hasEmail;
    private String email;
}
