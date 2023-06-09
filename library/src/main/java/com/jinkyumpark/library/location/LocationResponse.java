package com.jinkyumpark.library.location;

import com.jinkyumpark.library.location.kakaoMapApi.ApiKakaoMapConvertResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LocationResponse {

    private String fullAddress;
    private String shortAddress;

    public static LocationResponse of(ApiKakaoMapConvertResponse kakaoResponse) {
        return LocationResponse.builder()
                .fullAddress(kakaoResponse.getLongAddress())
                .shortAddress(kakaoResponse.getShortAddress())
                .build();
    }

}