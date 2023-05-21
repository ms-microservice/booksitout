package com.jinkyumpark.search.offlineLibrary

import com.jinkyumpark.search.common.SearchProvider
import com.jinkyumpark.search.common.SearchResult
import com.jinkyumpark.search.general.service.BookInfoService
import com.jinkyumpark.search.offlineLibrary.location.SeoulCity
import com.jinkyumpark.search.offlineLibrary.location.KoreaRegionEnum
import com.jinkyumpark.search.offlineLibrary.response.AvailableLibrary
import com.jinkyumpark.search.offlineLibrary.response.OfflineLibraryResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v2/search/library/offline")
class OfflineLibraryControllerV2(
    val bookInfoService: BookInfoService,
    val offlineLibraryService: OfflineLibraryService,
) {
    @GetMapping("by-region")
    fun getLibrarySearchResultByRegion(
        @RequestParam("query") query: String,
        @RequestParam("region") region: String,
        @RequestParam("region-detail", required = false) regionDetail: String,
    ): List<OfflineLibraryResponse> {
        val isbnToBookMap: Map<String, SearchResult> =
            bookInfoService.getBookInfoByQueryFromAladin(query, 5).associateBy { it.isbn ?: "" }

        val result: MutableList<OfflineLibraryResponse> = mutableListOf()
        for (isbn: String in isbnToBookMap.keys) {
            val availableLibrary: List<AvailableLibrary> = offlineLibraryService.getAvailableLibraryByRegion(
                isbn,
                KoreaRegionEnum.valueOf(region).apiRegionCode,
                SeoulCity.valueOf(regionDetail).apiRegionCode,
            )

            if (availableLibrary.isEmpty()) continue

            result.add(
                OfflineLibraryResponse(
                    book = SearchResult(
                        title = isbnToBookMap[isbn]?.title ?: "?",
                        author = isbnToBookMap[isbn]?.author ?: "?",
                        cover = isbnToBookMap[isbn]?.cover ?: "?",
                        link = null,
                        isbn = isbn,
                        searchProvider = SearchProvider.LIBRARY_OFFLINE,
                    ),
                    libraryList = availableLibrary,
                )
            )

        }

        return result
    }

}