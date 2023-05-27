package com.jinkyumpark.library.location.kakaoMapApi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiKakaoMapResponseDocument {

    private String region_type;
    private String code;

    private String address_name;
    private String region_1depth_name;
    private String region_2depth_name;
    private String region_3depth_name;
    private String region_4depth_name;

    private double x;
    private double y;

}
