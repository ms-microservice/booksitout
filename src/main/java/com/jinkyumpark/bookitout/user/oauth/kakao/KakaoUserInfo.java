package com.jinkyumpark.bookitout.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jinkyumpark.bookitout.user.dto.OAuthDto;
import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class KakaoUserInfo {
    private String id;
    @JsonProperty("connected_at")
    private String connectedAt;
    private Properties properties;
    @JsonProperty("kakao_account")
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

