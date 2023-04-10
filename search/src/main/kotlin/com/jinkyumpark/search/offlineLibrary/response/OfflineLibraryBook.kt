package com.jinkyumpark.search.offlineLibrary.response

import com.jinkyumpark.search.offlineLibrary.provider.Library
import java.time.LocalDate

data class OfflineLibraryBook(
    val title: String,
    val author: String,
    val cover: String,
    val isbn: String,
    val publishYear: Int?,

    val link: String,
    val library: Library,
    val location: String,
    val isLoanPossible: Boolean,
    val isReservationPossible: Boolean,
    val reservationCount: Int,
    val returnDate: LocalDate?,
)
