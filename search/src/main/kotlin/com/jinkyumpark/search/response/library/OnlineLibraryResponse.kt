package com.jinkyumpark.search.response.library

import com.jinkyumpark.search.provider.OnlineLibraryProvider

data class OnlineLibraryResponse(
    val title: String,
    val author: String,
    val cover: String,
    val link: String,
    val loanPossible: Boolean,
    val reservationPossible: Boolean,
    val provider: OnlineLibraryProvider,
)