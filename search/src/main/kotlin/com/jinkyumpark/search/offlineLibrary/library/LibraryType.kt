package com.jinkyumpark.search.offlineLibrary.library

enum class LibraryType(val koreanDisplayName: String) {

    NATIONAL("국립 도서관"),

    DO("도립 도서관"),
    CITY("시립 도서관"),
    GU("구립 도서관"),
    GUN("군립 도서관"),
    UMP("읍립 도서관"),
    MYUN("면립 도서관"),

    PRIVATE("사립 도서관"),

    UNIVERSITY("대학 도서관"),

    SMALL("작은 도서관"),

    UNKNOWN("모름"),
}