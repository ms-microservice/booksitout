package com.jinkyumpark.search.subscription.apiResponse.ridi

data class ApiRidiAuthor(
    var role: String?,
    val name: String,
    val author_id: String,
    val alias_name: String,
    val native_name: String,
    val order: String?,
)
