package com.jinkyumpark.settings.model;

import lombok.Getter;

@Getter
public enum KoreaRegion {
    SEOUL("서울", 11),
    BUSAN("부산", 21),
    DAEGU("대구", 22),
    INCHEON("인천", 23),
    GWANGJU("광주", 24),
    DAEJEON("대전", 25),
    ULSAN("울산", 26),
    SEJONG("세종", 29),
    GYEONGGIDO("경기도", 31),
    GANGWONDO("강원도", 32),
    CHUNGCHEONGBUKDO("충청북도", 33),
    CHUNGCHEONGNAMDO("충청남도", 34),
    JEOLLABUKDO("전라북도", 35),
    JEOLLANAMDO("전라남도", 36),
    GYEONGSANGBUKDO("경상북도", 37),
    GYEONGSANGNAMDO("경상남도", 38),
    JEJU("제주", 39);

    private final String koreanName;
    private final Integer apiRegionCode;

    KoreaRegion(String koreanName, Integer regionCode) {
        this.koreanName = koreanName;
        this.apiRegionCode = regionCode;
    }
}
