package com.jinkyumpark.search.general.response

import java.io.Serializable

data class BestSellerBookResponse(
    val id: Int,
    val title: String,
    val author: String,
    val cover: String,
    val isbn: Long,
): Serializable
