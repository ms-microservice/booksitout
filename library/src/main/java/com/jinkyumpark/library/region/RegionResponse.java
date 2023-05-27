package com.jinkyumpark.library.region;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class RegionResponse {

    private Long id;

    private RegionResponseRegion depth1;
    private RegionResponseDetail depth2;

    public static RegionResponse of(RegionDetail regionDetail) {
        return RegionResponse.builder()
                .id(regionDetail.getRegionDetailId())
                .depth1(RegionResponseRegion.builder()
                                .koreanName(regionDetail.getRegion().getKoreanName())
                                .englishName(regionDetail.getRegion().getEnglishName())
                                .logo(regionDetail.getRegion().getLogo())
                                .build()
                )
                .depth2(RegionResponseDetail.builder()
                        .koreanName(regionDetail.getKoreanName())
                        .englishName(regionDetail.getEnglishName())
                        .logo(regionDetail.getLogo())
                        .build())
                .build();
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class RegionResponseRegion {

    private String koreanName;
    private String englishName;
    private String logo;

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class RegionResponseDetail {

    private String koreanName;
    private String englishName;
    private String logo;

}