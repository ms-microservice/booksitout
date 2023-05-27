package com.jinkyumpark.library.location;

import com.jinkyumpark.library.location.kakaoMapApi.ApiKakaoMapConvertResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LatitudeAndLongitudeToAddressResponse {

    private String fullAddress;
    private String shortAddress;

    public static LatitudeAndLongitudeToAddressResponse of(ApiKakaoMapConvertResponse kakaoResponse) {
        return LatitudeAndLongitudeToAddressResponse.builder()
                .fullAddress(kakaoResponse.getLongAddress())
                .shortAddress(kakaoResponse.getShortAddress())
                .build();
    }

}