package com.jinkyumpark.user.oauth;

import lombok.Getter;

@Getter
public enum OAuthProvider {
    KAKAO("카카오"),
    NAVER("네이버"),
    GOOGLE("구글"),
    FACEBOOK("페이스북"),
    NOT_USING("연결 안 됨");

    private final String displayKoreanName;

    OAuthProvider(String displayKoreanName) {
        this.displayKoreanName = displayKoreanName;
    }
}
