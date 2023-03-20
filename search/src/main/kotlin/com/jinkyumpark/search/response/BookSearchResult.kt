package com.jinkyumpark.search.response

import com.jinkyumpark.search.provider.SearchProvider

data class BookSearchResult(
    val title: String,
    val author: String?,
    val cover: String?,
    val link: String?,
    val isbn: String?,

    val provider: SearchProvider?,
)
