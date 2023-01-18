package com.jinkyumpark.bookitout.user.oauth.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUserInfo {
    private String id;
    private String connectedAt;
    private Properties properties;
    private KakaoAccount kakaoAccount;
}

