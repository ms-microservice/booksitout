package com.jinkyumpark.user.appUser.dto;

import com.jinkyumpark.user.appUser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class AppUserInfoDto {

    private Long appUserId;
    private String email;
    private String name;
    private String profileImage;

    public static AppUserInfoDto of(AppUser appUser) {
        return AppUserInfoDto.builder()
                .appUserId(appUser.getAppUserId())
                .email(appUser.getEmail())
                .name(appUser.getName())
                .profileImage(appUser.getProfileImage())
                .build();
    }

}