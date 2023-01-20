package com.jinkyumpark.bookitout.user.dto;

import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OAuthDto {
    private OAuthProvider oAuthProvider;
    private String oAuthId;
    private String email;
    private String name;
    private String profileImage;
}