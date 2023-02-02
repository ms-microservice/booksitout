package com.jinkyumpark.bookitout.settings;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.search.request.KoreaRegion;
import com.jinkyumpark.bookitout.search.request.SeoulRegionDetail;
import com.jinkyumpark.bookitout.settings.dtos.SettingsDto;
import com.jinkyumpark.bookitout.settings.model.MyBookSearchRange;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@Entity @Table
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long settingsId;

    @Enumerated(EnumType.STRING)
    private KoreaRegion region;

    @Enumerated(EnumType.STRING)
    private SeoulRegionDetail regionDetail;

    @Enumerated(EnumType.STRING)
    private MyBookSearchRange myBookSearchRange;

    @OneToOne(orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id")
    @JsonIgnore
    private AppUser appUser;

    @Builder
    public Settings(KoreaRegion region, SeoulRegionDetail regionDetail, MyBookSearchRange myBookSearchRange, AppUser appUser) {
        this.region = region;
        this.regionDetail = regionDetail;
        this.myBookSearchRange = myBookSearchRange;
        this.appUser = appUser;
    }

    public void update(SettingsDto settingsDto) {
        if (settingsDto.getRegion() != null) this.region = settingsDto.getRegion();
        if (settingsDto.getRegionDetail() != null) this.regionDetail = settingsDto.getRegionDetail();
    }
}
