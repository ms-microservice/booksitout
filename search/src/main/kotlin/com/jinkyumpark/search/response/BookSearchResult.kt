package com.jinkyumpark.search.response

import com.jinkyumpark.search.provider.SearchProvider

class BookSearchResult(
    val title: String,
    val author: String?,
    val cover: String?,

    val link: String?,
    val isbn: String? = null,

    val loanPossible: Boolean = false,
    val reservationPossible: Boolean = false,

    val provider: SearchProvider?,
)
