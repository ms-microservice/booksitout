package com.jinkyumpark.search.offlineLibrary.location

enum class SeoulCity(
    val province: KoreaRegionEnum,
    val koreanName: String,
    val apiRegionCode: Int,
) {
    JONGNOGU(KoreaRegionEnum.SEOUL, "종로구", 11010),
    JUNGGU(KoreaRegionEnum.SEOUL, "중구", 11020),
    YONGSANGU(KoreaRegionEnum.SEOUL, "용산구", 11030),
    SEONGDONGGU(KoreaRegionEnum.SEOUL, "성동구", 11040),
    GWANGJINGU(KoreaRegionEnum.SEOUL, "광진구", 11050),
    DONGDAEMUNGU(KoreaRegionEnum.SEOUL, "동대문구", 11060),
    JUNGNANGGU(KoreaRegionEnum.SEOUL, "중랑구", 11070),
    SEONGBUKGU(KoreaRegionEnum.SEOUL, "성북구", 11080),
    GANGBUKGU(KoreaRegionEnum.SEOUL, "강북구", 11090),
    DOBONGGU(KoreaRegionEnum.SEOUL, "도봉구", 11100),
    NOWONGU(KoreaRegionEnum.SEOUL, "노원구", 11110),
    EUNPYEONGGU(KoreaRegionEnum.SEOUL, "은평구", 11120),
    SEODAEMUNGU(KoreaRegionEnum.SEOUL, "서대문구", 11130),
    MAPOGU(KoreaRegionEnum.SEOUL, "마포구", 11140),
    YANGCHEONGU(KoreaRegionEnum.SEOUL, "양천구", 11150),
    GANGSEOGU(KoreaRegionEnum.SEOUL, "강서구", 11160),
    GUROGU(KoreaRegionEnum.SEOUL, "구로구", 11170),
    GEUMCHEONGU(KoreaRegionEnum.SEOUL, "금천구", 11180),
    YEONGDEUNGPOGU(KoreaRegionEnum.SEOUL, "영등포구", 11190),
    DONGJAKGU(KoreaRegionEnum.SEOUL, "동작구", 11200),
    GWANAKGU(KoreaRegionEnum.SEOUL, "관악구", 11210),
    SEOCHOGU(KoreaRegionEnum.SEOUL, "서초구", 11220),
    GANGNAMGU(KoreaRegionEnum.SEOUL, "강남구", 11230),
    SONGPAGU(KoreaRegionEnum.SEOUL, "송파구", 11240),
    GANGDONGGU(KoreaRegionEnum.SEOUL, "강동구", 11250);
}