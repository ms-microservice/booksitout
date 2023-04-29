package com.jinkyumpark.search.settings.model;

import lombok.Getter;

@Getter
public enum SeoulRegionDetail {
    JONGNOGU("종로구", 11010),
    JUNGGU("중구", 11020),
    YONGSANGU("용산구", 11030),
    SEONGDONGGU("성동구", 11040),
    GWANGJINGU("광진구", 11050),
    DONGDAEMUNGU("동대문구", 11060),
    JUNGNANGGU("중랑구", 11070),
    SEONGBUKGU("성북구", 11080),
    GANGBUKGU("강북구", 11090),
    DOBONGGU("도봉구", 11100),
    NOWONGU("노원구", 11110),
    EUNPYEONGGU("은평구", 11120),
    SEODAEMUNGU("서대문구", 11130),
    MAPOGU("마포구", 11140),
    YANGCHEONGU("양천구", 11150),
    GANGSEOGU("강서구", 11160),
    GUROGU("구로구", 11170),
    GEUMCHEONGU("금천구", 11180),
    YEONGDEUNGPOGU("영등포구", 11190),
    DONGJAKGU("동작구", 11200),
    GWANAKGU("관악구", 11210),
    SEOCHOGU("서초구", 11220),
    GANGNAMGU("강남구", 11230),
    SONGPAGU("송파구", 11240),
    GANGDONGGU("강동구", 11250);

    private final String koreanName;
    private final Integer apiRegionCode;

    SeoulRegionDetail(String koreanName, Integer apiRegionCode) {
        this.koreanName = koreanName;
        this.apiRegionCode = apiRegionCode;
    }
}

