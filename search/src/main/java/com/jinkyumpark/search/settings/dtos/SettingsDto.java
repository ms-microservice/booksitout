package com.jinkyumpark.search.settings.dtos;

import com.jinkyumpark.search.settings.Settings;
import com.jinkyumpark.search.settings.model.KoreaRegion;
import com.jinkyumpark.search.settings.model.LibrarySearchMethod;
import com.jinkyumpark.search.settings.model.MyBookSearchRange;
import com.jinkyumpark.search.settings.model.SeoulRegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor @Builder
@Getter
public class SettingsDto {
    private Long appUserId;

    private final KoreaRegion region;
    private final SeoulRegionDetail regionDetail;
    private final MyBookSearchRange myBookSearchRange;
    private final LibrarySearchMethod librarySearchMethod;

    private String libraryOnlineSearchRange;
    private String subscriptionSearchRange;
    private String usedOnlineSearchRange;
    private String usedOfflineSearchRange;

    public Settings toEntity() {
        return Settings.builder()
                .appUserId(appUserId)

                .region(region)
                .regionDetail(regionDetail)
                .myBookSearchRange(myBookSearchRange)
                .librarySearchMethod(librarySearchMethod)

                .libraryOnlineSearchRange(libraryOnlineSearchRange)
                .subscriptionSearchRange(subscriptionSearchRange)
                .usedOnlineSearchRange(usedOnlineSearchRange)
                .usedOfflineSearchRange(usedOfflineSearchRange)

                .build();
    }
}
