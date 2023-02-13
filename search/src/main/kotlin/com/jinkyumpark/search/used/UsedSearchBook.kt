package com.jinkyumpark.search.used

data class UsedSearchBook(
    val provider: UsedBookProvider,

    val title: String,
    val author: String,
    val cover: String,
    val link: String,

    val stockCount: Int,
    val minPrice: Int,

    val locationList: List<String>
)
