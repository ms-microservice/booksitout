package com.jinkyumpark.bookitout.settings;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.settings.dtos.SettingsDto;
import com.jinkyumpark.bookitout.settings.model.KoreaRegion;
import com.jinkyumpark.bookitout.settings.model.MyBookSearchRange;
import com.jinkyumpark.bookitout.settings.model.SeoulRegionDetail;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter

@Entity @Table
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long settingsId;

    @Enumerated(EnumType.STRING)
    private KoreaRegion region;

    @Enumerated(EnumType.STRING)
    private SeoulRegionDetail regionDetail;

    @Enumerated(EnumType.STRING)
    private MyBookSearchRange myBookSearchRange;

    private String libraryOnlineSearchRange;
    private String subscriptionSearchRange;
    private String usedOnlineSearchRange;
    private String usedOfflineSearchRange;

    @OneToOne(orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id")
    @JsonIgnore
    private AppUser appUser;

    @Builder
    public Settings(KoreaRegion region, SeoulRegionDetail regionDetail, MyBookSearchRange myBookSearchRange,
                    String libraryOnlineSearchRange, String subscriptionSearchRange, String usedOnlineSearchRange, String usedOfflineSearchRange,
                    AppUser appUser) {
        this.region = region;
        this.regionDetail = regionDetail;
        this.myBookSearchRange = myBookSearchRange;
        this.libraryOnlineSearchRange = libraryOnlineSearchRange;
        this.subscriptionSearchRange = subscriptionSearchRange;
        this.usedOnlineSearchRange = usedOnlineSearchRange;
        this.usedOfflineSearchRange = usedOfflineSearchRange;
        this.appUser = appUser;
    }

    public void update(SettingsDto settingsDto) {
        if (settingsDto.getRegion() != null) this.region = settingsDto.getRegion();
        if (settingsDto.getRegionDetail() != null) this.regionDetail = settingsDto.getRegionDetail();
        if (settingsDto.getMyBookSearchRange() != null) this.myBookSearchRange = settingsDto.getMyBookSearchRange();
        if (settingsDto.getSubscriptionSearchRange() != null) this.subscriptionSearchRange = settingsDto.getSubscriptionSearchRange();
        if (settingsDto.getLibraryOnlineSearchRange() != null) this.libraryOnlineSearchRange = settingsDto.getLibraryOnlineSearchRange();
        if (settingsDto.getUsedOnlineSearchRange() != null) this.usedOnlineSearchRange = settingsDto.getUsedOnlineSearchRange();
        if (settingsDto.getUsedOfflineSearchRange() != null) this.usedOfflineSearchRange = settingsDto.getUsedOfflineSearchRange();
    }

    public void deleteRegion() {
        this.region = null;
        this.regionDetail = null;
    }
}
