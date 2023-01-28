package com.jinkyumpark.bookitout.user.oauth.kakao;

import com.jinkyumpark.bookitout.user.dto.OAuthDto;
import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUserInfo {
    private String id;
    private String connectedAt;
    private Properties properties;
    private KakaoAccount kakaoAccount;

    public OAuthDto toDto() {
        return OAuthDto.builder()
                .oAuthId(id)
                .oAuthProvider(OAuthProvider.KAKAO)
                .email(kakaoAccount.getEmail())
                .name(properties.getNickname())
                .profileImage(kakaoAccount.getProfile().getProfileImageUrl())
                .build();
    }
}

