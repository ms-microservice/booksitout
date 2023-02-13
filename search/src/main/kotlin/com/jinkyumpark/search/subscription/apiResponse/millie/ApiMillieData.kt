package com.jinkyumpark.search.subscription.apiResponse.millie

data class ApiMillieData(
    val list: List<ApiMillieBook>,
    val total: Int,
    val suggestKeyword: List<String>?,
)