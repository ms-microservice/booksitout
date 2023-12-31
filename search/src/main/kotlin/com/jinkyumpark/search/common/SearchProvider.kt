package com.jinkyumpark.search.common

import com.jinkyumpark.search.common.SearchCategory

enum class SearchProvider(
    val category: SearchCategory,
    val apiKey: String,
) {
    SEOUL_LIBRARY(SearchCategory.LIBRARY_ONLINE, "SEOUL_LIBRARY"),
    SEOUL_EDUCATION_LIBRARY(SearchCategory.LIBRARY_ONLINE, "SEOUL_EDUCATION_LIBRARY"),
    NATIONAL_ASSEMBLY_LIBRARY(SearchCategory.LIBRARY_ONLINE, "NATIONAL_ASSEMBLY_LIBRARY"),
    GYEONGGI_EDUCATION_LIBRARY(SearchCategory.LIBRARY_ONLINE, "GYEONGGI_EDUCATION_LIBRARY"),
    GWANGHWAMUN_LIBRARY(SearchCategory.LIBRARY_ONLINE, "GWANGHWAMUN_LIBRARY"),
    SEOUL_CONGRESS_LIBRARY(SearchCategory.LIBRARY_ONLINE, "SEOUL_CONGRESS_LIBRARY"),

    MILLIE_SUBSCRIPTION(SearchCategory.SUBSCRIPTION, "MILLIE"),
    YES24_SUBSCRIPTION(SearchCategory.SUBSCRIPTION, "YES24"),
    RIDI_SUBSCRIPTION(SearchCategory.SUBSCRIPTION, "RIDI"),
    KYOBO_SUBSCRIPTION(SearchCategory.SUBSCRIPTION, "KYOBO"),

    ALADIN_USED_ONLINE(SearchCategory.USED_ONLINE, "ONLINE_ALADIN"),
    YES24_USED_ONLINE(SearchCategory.USED_ONLINE, "ONLINE_YES24"),
    KYOBO_USED_ONLINE(SearchCategory.USED_ONLINE, "ONLINE_KYOBO"),
    INTERPARK_USED_ONLINE(SearchCategory.USED_ONLINE, "INTERPARK"),

    ALADIN_USED_OFFLINE(SearchCategory.USED_OFFLINE, "OFFLINE_ALADIN"),
    YES24_USED_OFFLINE(SearchCategory.USED_OFFLINE, "OFFLINE_YES24"),

    LIBRARY_OFFLINE(SearchCategory.LIBRARY_OFFLINE, ""),
}