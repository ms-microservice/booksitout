package com.jinkyumpark.user.publicUser.dto;

import com.jinkyumpark.user.appUser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
@AllArgsConstructor @Builder
public class PublicUser {
    private final Long appUserId;
    private final String email;
    private final String name;
    private final String profileImage;

    private final Boolean isPaidUser;
    private final Integer joinDayCount;

    public static PublicUser of(AppUser appUser) {
        int joinDayCount = (int) ChronoUnit.DAYS.between(appUser.getCreatedDate().toLocalDate(), LocalDate.now());

        String name = appUser.getPublicName() == null ? appUser.getName() : appUser.getPublicName();

        return PublicUser.builder()
                .appUserId(appUser.getAppUserId())
                .name(name)
                .profileImage(appUser.getPublicProfileImage())

                .email(appUser.getEmail())
                .isPaidUser(true)
                .joinDayCount(joinDayCount)
                .build();
    }
}
