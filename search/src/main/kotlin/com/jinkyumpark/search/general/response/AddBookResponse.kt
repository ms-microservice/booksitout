package com.jinkyumpark.search.general.response

import java.io.Serializable

data class AddBookResponse(
    val title: String,
    val author: String,
    val cover: String,
    val isbn: String,
    val link: String,
    val description: String,
): Serializable