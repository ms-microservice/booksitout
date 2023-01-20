package com.jinkyumpark.bookitout.user.oauth.naver;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NaverUserInfo {
    private final String resultcode;
    private final String message;
    private final NaverResponse response;
}
