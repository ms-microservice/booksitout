package com.jinkyumpark.search.offlineLibrary

import com.jinkyumpark.search.offlineLibrary.provider.Library
import com.jinkyumpark.search.offlineLibrary.response.LibraryBook
import com.jinkyumpark.search.offlineLibrary.response.LibraryInfo
import com.jinkyumpark.search.offlineLibrary.response.OfflineLibraryBook
import com.jinkyumpark.search.offlineLibrary.response.OfflineLibraryByIsbnResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v3/search/library")
class OfflineLibraryControllerV3(
    val offlineLibraryService: OfflineLibraryService,
) {

    @GetMapping("{query}")
    fun getSearchResult(
        @PathVariable query: String,
        @RequestParam("library") libraryList: List<String>,
    ): List<OfflineLibraryByIsbnResponse> {

        return offlineLibraryService
            .getYeongdeungpoguResult(query, libraryList.map { Library.valueOf(it.uppercase()) })
            .groupBy { it.isbn }
            .values
            .map {
                val firstValue = it.first()

                OfflineLibraryByIsbnResponse(
                    title = firstValue.title,
                    author = firstValue.author,
                    cover = firstValue.cover,
                    isbn = firstValue.isbn,
                    publishYear = firstValue.publishYear,
                    availableLibrary = it.map { lib ->
                        LibraryBook(
                            link = lib.link,
                            bookLocation = lib.location,
                            loanPossible = lib.isLoanPossible,
                            reservationPossible = lib.isReservationPossible,
                            reservationCount = lib.reservationCount,
                            returnDate = lib.returnDate,

                            library = LibraryInfo(
                                name = lib.library.displayName,
                                province = lib.library.city.province.koreanName,
                                city = lib.library.city.koreanName,
                                location = lib.library.location,
                            )
                        )
                    }

                )
            }
    }


}