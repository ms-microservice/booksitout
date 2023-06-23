package com.jinkyumpark.search.general.response

import java.io.Serializable

data class AddBookResponse(
    val isbn: String,

    val title: String,
    val author: String,
    val cover: String?,

    val link: String?,
    val description: String?,

    val publicationYear: Int?,
    val page: Int?,

    val language: String?,
    val category: String?,
): Serializable