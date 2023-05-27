package com.jinkyumpark.library.location;

import com.jinkyumpark.library.location.kakaoMapApi.ApiKakaoMapConvertResponse;
import com.jinkyumpark.library.location.kakaoMapApi.KakaoMapApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/location")
public class LocationControllerV5 {

    private final KakaoMapApiService kakaoMapApiService;

    @GetMapping("convert-address")
    public LatitudeAndLongitudeToAddressResponse getAddressByLatitudeAndLongitude(@RequestParam("lat") Double latitude,
                                                                                  @RequestParam("long") Double longitude) {
        ApiKakaoMapConvertResponse kakaoResponse = kakaoMapApiService.getAddressByLatitudeAndLongitude(latitude, longitude);

        return LatitudeAndLongitudeToAddressResponse.of(kakaoResponse);
    }

}
