package com.jinkyumpark.search.offlineLibrary.response

import com.jinkyumpark.search.offlineLibrary.provider.City
import java.time.LocalDate

data class OfflineLibraryByIsbnResponse(
  val title: String,
  val author: String,
  val cover: String,
  val isbn: String,
  val publishYear: Int?,

  val availableLibrary: List<LibraryBook>
)

data class LibraryBook(
    val link: String,
    val bookLocation: String,
    val loanPossible: Boolean,
    val reservationPossible: Boolean,
    val reservationCount: Int,
    val returnDate: LocalDate?,

    val library: LibraryInfo
)

data class LibraryInfo(
    val name: String,
    val province: String,
    val city: String,
    val location: String
)