package com.jinkyumpark.search.apiResponse.naver

data class ApiNaverSearchResponse(
    val lastBuildDate: String,
    val total: Int,
    val start: Int,
    val display: Int,
    val items: List<NaverBook>
)

data class NaverBook(
    val title: String,
    val link: String,
    val image: String,
    val author: String,
    val discount: String,
    val publisher: String,
    val pubdate: String,
    val isbn: String,
    val description: String,
)