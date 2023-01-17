package com.jinkyumpark.bookitout.user.dto;

import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class KakaoDto {
    private OAuthProvider oAuthProvider;
    private Long oAuthId;
    private String email;
    private String name;
    private String profileImage;
}
