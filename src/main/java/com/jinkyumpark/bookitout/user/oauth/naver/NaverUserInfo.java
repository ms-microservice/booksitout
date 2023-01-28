package com.jinkyumpark.bookitout.user.oauth.naver;

import com.jinkyumpark.bookitout.user.dto.OAuthDto;
import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NaverUserInfo {
    private final String resultcode;
    private final String message;
    private final NaverResponse response;

    public OAuthDto toDto() {
        return OAuthDto.builder()
                .oAuthId(response.getId())
                .oAuthProvider(OAuthProvider.NAVER)
                .email(response.getEmail())
                .name(response.getName())
                .profileImage(response.getProfileImage())
                .build();
    }
}
