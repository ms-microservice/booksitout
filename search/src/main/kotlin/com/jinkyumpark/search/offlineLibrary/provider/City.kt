package com.jinkyumpark.search.offlineLibrary.provider

enum class City(
    val province: KoreaRegion,
    val koreanName: String,
    val apiRegionCode: Int,
) {

    JONGNOGU(KoreaRegion.SEOUL, "종로구", 11010),
    JUNGGU(KoreaRegion.SEOUL, "중구", 11020),
    YONGSANGU(KoreaRegion.SEOUL, "용산구", 11030),
    SEONGDONGGU(KoreaRegion.SEOUL, "성동구", 11040),
    GWANGJINGU(KoreaRegion.SEOUL, "광진구", 11050),
    DONGDAEMUNGU(KoreaRegion.SEOUL, "동대문구", 11060),
    JUNGNANGGU(KoreaRegion.SEOUL, "중랑구", 11070),
    SEONGBUKGU(KoreaRegion.SEOUL, "성북구", 11080),
    GANGBUKGU(KoreaRegion.SEOUL, "강북구", 11090),
    DOBONGGU(KoreaRegion.SEOUL, "도봉구", 11100),
    NOWONGU(KoreaRegion.SEOUL, "노원구", 11110),
    EUNPYEONGGU(KoreaRegion.SEOUL, "은평구", 11120),
    SEODAEMUNGU(KoreaRegion.SEOUL, "서대문구", 11130),
    MAPOGU(KoreaRegion.SEOUL, "마포구", 11140),
    YANGCHEONGU(KoreaRegion.SEOUL, "양천구", 11150),
    GANGSEOGU(KoreaRegion.SEOUL, "강서구", 11160),
    GUROGU(KoreaRegion.SEOUL, "구로구", 11170),
    GEUMCHEONGU(KoreaRegion.SEOUL, "금천구", 11180),
    YEONGDEUNGPOGU(KoreaRegion.SEOUL, "영등포구", 11190),
    DONGJAKGU(KoreaRegion.SEOUL, "동작구", 11200),
    GWANAKGU(KoreaRegion.SEOUL, "관악구", 11210),
    SEOCHOGU(KoreaRegion.SEOUL, "서초구", 11220),
    GANGNAMGU(KoreaRegion.SEOUL, "강남구", 11230),
    SONGPAGU(KoreaRegion.SEOUL, "송파구", 11240),
    GANGDONGGU(KoreaRegion.SEOUL, "강동구", 11250);

}