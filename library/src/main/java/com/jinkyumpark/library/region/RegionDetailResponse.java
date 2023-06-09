package com.jinkyumpark.library.region;

import com.jinkyumpark.library.region.regionDetail.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class RegionDetailResponse {

    private Long id;

    private RegionDetailResponseName name;
    private String logo;

    private RegionDetailResponseRegion region;

    public static RegionDetailResponse of(RegionDetail regionDetail) {
        return RegionDetailResponse.builder()
                .id(regionDetail.getRegionDetailId())

                .name(RegionDetailResponseName.builder()
                        .korean(regionDetail.getKoreanName())
                        .english(regionDetail.getEnglishName())
                        .build())
                .logo(regionDetail.getLogo())

                .region(RegionDetailResponseRegion.builder()
                        .name(RegionDetailResponseName.builder()
                                .korean(regionDetail.getRegion().getKoreanName())
                                .english(regionDetail.getRegion().getEnglishName())
                                .build())
                        .logo(regionDetail.getRegion().getLogo())
                        .build())

                .build();
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class RegionDetailResponseName {
    private String korean;
    private String english;
}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class RegionDetailResponseRegion {
    private RegionDetailResponseName name;
    private String logo;
}