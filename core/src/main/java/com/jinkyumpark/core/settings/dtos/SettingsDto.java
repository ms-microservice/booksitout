package com.jinkyumpark.core.settings.dtos;

import com.jinkyumpark.core.settings.Settings;
import com.jinkyumpark.core.settings.model.KoreaRegion;
import com.jinkyumpark.core.settings.model.MyBookSearchRange;
import com.jinkyumpark.core.settings.model.SeoulRegionDetail;
import com.jinkyumpark.core.user.AppUser;
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