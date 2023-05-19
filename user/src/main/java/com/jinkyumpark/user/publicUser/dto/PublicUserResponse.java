package com.jinkyumpark.user.publicUser.dto;

import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.publicUser.PublicUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor @Builder
public class PublicUserResponse {
    private final Long appUserId;
    private final String email;
    private final String name;
    private final String profileImage;

    private final Boolean isPaidUser;
    private final Integer joinDayCount;

    public static PublicUserResponse of(PublicUser publicUser, AppUser appUser) {
        int joinDayCount = appUser.getCreatedDate().toLocalDate().until(LocalDate.now()).getDays();

        return PublicUserResponse.builder()
                .appUserId(publicUser.getAppUser().getAppUserId())
                .name(publicUser.getNickName())
                .email(appUser.getEmail())
                .profileImage(publicUser.getProfileImage())
                .isPaidUser(true)
                .joinDayCount(joinDayCount)
                .build();
    }
}
