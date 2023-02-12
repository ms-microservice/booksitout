package com.jinkyumpark.search.bookSearch

data class BookSearchResult(
    val title: String,
    val author: String?,
    val cover: String?,
    val link: String?,
    val isbn: String?
)
