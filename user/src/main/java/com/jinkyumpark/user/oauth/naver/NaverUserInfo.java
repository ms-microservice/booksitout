package com.jinkyumpark.user.oauth.naver;

import com.jinkyumpark.user.oauth.OAuthDto;
import com.jinkyumpark.user.oauth.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Builder
@Getter
public class NaverUserInfo {
    private String resultcode;
    private String message;
    private NaverResponse response;

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
