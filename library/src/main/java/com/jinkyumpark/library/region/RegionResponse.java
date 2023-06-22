package com.jinkyumpark.library.region;

import com.jinkyumpark.library.region.region.Region;
import com.jinkyumpark.library.region.regionDetail.RegionDetail;
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
                        .koreanName(regionDetail.getRegion().getDisplayKoreanName() == null ?
                                regionDetail.getRegion().getKoreanName() :
                                regionDetail.getRegion().getDisplayKoreanName())
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

    public static RegionResponse of(Region region) {
        return RegionResponse.builder()
                .id(region.getRegionId())
                .depth1(RegionResponseRegion.builder()
                        .koreanName(region.getDisplayKoreanName() == null ?
                                region.getKoreanName() :
                                region.getDisplayKoreanName())
                        .englishName(region.getEnglishName())
                        .logo(region.getLogo())
                        .build()
                )
                .depth2(null)
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