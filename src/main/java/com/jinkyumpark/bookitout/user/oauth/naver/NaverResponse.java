package com.jinkyumpark.bookitout.user.oauth.naver;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NaverResponse {
    private final String id;
    private final String message;
    private final String email;
    private final String name;
    private final String profileImage;
    private final String birthday;
}