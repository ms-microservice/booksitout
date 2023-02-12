package com.jinkyumpark.search.library.response

import com.jinkyumpark.search.library.OnlineLibraryProvider

data class OnlineLibraryResponse(
    val title: String,
    val author: String,
    val cover: String,
    val link: String,
    val loanPossible: Boolean,
    val reservationPossible: Boolean,
    val provider: OnlineLibraryProvider,
)