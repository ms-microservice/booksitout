package com.jinkyumpark.search.used.apiResponse.aladin

data class ApiAladinResponse(
    var version: String?,
    val logo: String?,
    val title: String?,
    val link: String?,
    val pubDate: String?,
    val totalResults: Int?,
    val startIndex: Int?,
    val itemsPerPage: Int?,
    val query: String?,
    val searchCategoryId: Int?,
    val searchCategoryName: String?,
    val imageUrl: String?,
    val item: List<ApiAladinItem>?,
)
