package com.jinkyumpark.bookitout.settings.dtos;

import com.jinkyumpark.bookitout.search.request.KoreaRegion;
import com.jinkyumpark.bookitout.search.request.SeoulRegionDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ChangeRegionRequest {
    private String region;

    @NotNull
    @NotBlank
    private String regionDetail;

    public SettingsDto toDto(Long appUserId) {
        return SettingsDto.builder()
                .appUserId(appUserId)
                .region(KoreaRegion.valueOf(region))
                .regionDetail(SeoulRegionDetail.valueOf(regionDetail))
                .build();
    }
}
