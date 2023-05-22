package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class GatheringUserResponse {

    private Long id;
    private String name;
    private String profileImage;

    public static GatheringUserResponse of(AppUserInfo appUserInfo) {
        return GatheringUserResponse.builder()
                .id(appUserInfo.getAppUserId())
                .name(appUserInfo.getName())
                .profileImage(appUserInfo.getProfileImage())
                .build();
    }

}