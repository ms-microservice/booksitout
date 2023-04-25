package com.jinkyumpark.search.offlineLibrary.response

import java.time.LocalDate

data class OfflineLibraryBook(
    val title: String,
    val author: String,
    val cover: String,
    val isbn: String,
    val publishYear: Int?,

    val link: String,
    val library: String,
    val location: String,
    val isLoanPossible: Boolean,
    val isReservationPossible: Boolean,
    val reservationCount: Int,
    val returnDate: LocalDate?,
)
