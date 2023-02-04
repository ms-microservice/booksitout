package com.jinkyumpark.bookitout.settings.dtos;

import com.jinkyumpark.bookitout.search.request.KoreaRegion;
import com.jinkyumpark.bookitout.search.request.SeoulRegionDetail;
import com.jinkyumpark.bookitout.settings.Settings;
import com.jinkyumpark.bookitout.settings.model.MyBookSearchRange;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SettingsDto {
    private Long appUserId;

    private final KoreaRegion region;
    private final SeoulRegionDetail regionDetail;
    private final MyBookSearchRange myBookSearchRange;

    private String libraryOnlineSearchRange;
    private String subscriptionSearchRange;
    private String usedOnlineSearchRange;
    private String usedOfflineSearchRange;

    public Settings toEntity() {
        return Settings.builder()
                .appUser(new AppUser(appUserId))
                .region(region)
                .regionDetail(regionDetail)
                .myBookSearchRange(myBookSearchRange)
                .libraryOnlineSearchRange(libraryOnlineSearchRange)
                .subscriptionSearchRange(subscriptionSearchRange)
                .usedOnlineSearchRange(usedOnlineSearchRange)
                .usedOfflineSearchRange(usedOfflineSearchRange)
                .build();
    }
}
