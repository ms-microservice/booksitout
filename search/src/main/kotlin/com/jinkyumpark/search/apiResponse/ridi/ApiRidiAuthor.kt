package com.jinkyumpark.search.apiResponse.ridi

data class ApiRidiAuthor(
    var role: String?,
    val name: String,
    val author_id: String,
    val alias_name: String,
    val native_name: String,
    val order: String?,
)
