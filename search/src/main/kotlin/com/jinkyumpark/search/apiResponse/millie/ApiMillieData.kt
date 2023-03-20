package com.jinkyumpark.search.apiResponse.millie

data class ApiMillieData(
    val list: List<ApiMillieBook>,
    val total: Int,
    val suggestKeyword: List<String>?,
)