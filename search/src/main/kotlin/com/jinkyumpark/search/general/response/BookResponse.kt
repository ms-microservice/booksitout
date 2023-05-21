package com.jinkyumpark.search.general.response

import java.time.LocalDate

data class BookResponse(
    val isbn: Long,
    val title: String,
    val author: String,
    val cover: String,
    val description: String,
    val publisher: String,
    val publishDate: LocalDate?,
)