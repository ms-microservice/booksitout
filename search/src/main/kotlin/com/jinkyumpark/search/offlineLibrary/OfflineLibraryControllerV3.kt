package com.jinkyumpark.search.offlineLibrary

import com.jinkyumpark.search.offlineLibrary.library.LibraryService
import com.jinkyumpark.search.offlineLibrary.response.*
import org.springframework.web.bind.annotation.*
import java.net.URLEncoder

@RestController
@RequestMapping("v3/search/library")
class OfflineLibraryControllerV3(
    val offlineLibraryService: OfflineLibraryService,
    val libraryService: LibraryService,
) {

    @GetMapping("{query}")
    fun getSearchResult(
        @PathVariable query: String,
        @RequestParam("library") libraryList: List<String>,
    ): List<OfflineLibraryByIsbnResponse> {

        val libraryEntityList = libraryList
            .mapNotNull { libraryService.getLibraryByEnglishName(it) }

        return offlineLibraryService
            .getYeongdeungpoguResult(query, libraryEntityList)
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
                                name = lib.library,
                                province = null,
                                city = null,
                                location = null,
                            )
                        )
                    }

                )
            }

    }

}