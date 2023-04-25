package com.jinkyumpark.search.common

import java.io.Serializable

class SearchResult(
    val title: String,
    val author: String?,
    val cover: String?,

    val link: String?,
    val isbn: String? = null,

    val loanPossible: Boolean = false,
    val reservationPossible: Boolean = false,

    val stockCount: Int = 0,
    val minPrice: Int = 0,
    val locationList: List<String> = listOf(),

    val searchProvider: SearchProvider?,
    var provider: String = "",
): Serializable {
    init {
        provider = searchProvider?.apiKey ?: ""
    }
}