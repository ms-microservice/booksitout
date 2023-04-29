package com.jinkyumpark.search.settings;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.search.settings.dtos.SettingsDto;
import com.jinkyumpark.search.settings.model.KoreaRegion;
import com.jinkyumpark.search.settings.model.MyBookSearchRange;
import com.jinkyumpark.search.settings.model.LibrarySearchMethod;
import com.jinkyumpark.search.settings.model.SeoulRegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@AllArgsConstructor @NoArgsConstructor @Builder
@Getter

@Entity @Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"appUserId"})})
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long settingsId;
    @Column(unique = true)
    private Long appUserId;

    @Enumerated(EnumType.STRING)
    private KoreaRegion region;
    @Enumerated(EnumType.STRING)
    private SeoulRegionDetail regionDetail;

    @Enumerated(EnumType.STRING)
    private LibrarySearchMethod librarySearchMethod;

    @Column(columnDefinition = "varchar(10) default 'REGION")
    @Enumerated(EnumType.STRING)
    private MyBookSearchRange myBookSearchRange;

    private String libraryOnlineSearchRange;
    private String subscriptionSearchRange;
    private String usedOnlineSearchRange;
    private String usedOfflineSearchRange;

    public SettingsDto toDto() {
        return SettingsDto.builder()
                .appUserId(this.appUserId)
                .region(this.region)
                .regionDetail(this.regionDetail)
                .myBookSearchRange(this.myBookSearchRange)
                .libraryOnlineSearchRange(this.libraryOnlineSearchRange)
                .subscriptionSearchRange(this.subscriptionSearchRange)
                .usedOnlineSearchRange(this.usedOnlineSearchRange)
                .usedOfflineSearchRange(this.usedOfflineSearchRange)
                .librarySearchMethod(this.librarySearchMethod)
                .build();
    }

    public void update(SettingsDto settingsDto) {
        if (settingsDto.getRegion() != null) this.region = settingsDto.getRegion();
        if (settingsDto.getRegionDetail() != null) this.regionDetail = settingsDto.getRegionDetail();
        if (settingsDto.getMyBookSearchRange() != null) this.myBookSearchRange = settingsDto.getMyBookSearchRange();
        if (settingsDto.getSubscriptionSearchRange() != null) this.subscriptionSearchRange = settingsDto.getSubscriptionSearchRange();
        if (settingsDto.getLibraryOnlineSearchRange() != null) this.libraryOnlineSearchRange = settingsDto.getLibraryOnlineSearchRange();
        if (settingsDto.getUsedOnlineSearchRange() != null) this.usedOnlineSearchRange = settingsDto.getUsedOnlineSearchRange();
        if (settingsDto.getUsedOfflineSearchRange() != null) this.usedOfflineSearchRange = settingsDto.getUsedOfflineSearchRange();
        if (settingsDto.getLibrarySearchMethod() != null) this.librarySearchMethod = settingsDto.getLibrarySearchMethod();
    }

    public void deleteRegion() {
        this.region = null;
        this.regionDetail = null;
    }

}
