package com.jinkyumpark.search.library

import com.jinkyumpark.search.bookSearch.BookSearchResult
import com.jinkyumpark.search.bookSearch.SearchBookService
import com.jinkyumpark.search.common.exception.BadRequestException
import com.jinkyumpark.search.library.region.KoreaRegion
import com.jinkyumpark.search.library.region.SeoulRegion
import com.jinkyumpark.search.library.response.AvailableLibrary
import com.jinkyumpark.search.library.response.OfflineLibraryResponse
import com.jinkyumpark.search.library.response.OnlineLibraryResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/v2/search/library")
@RestController
class LibraryController(
    val libraryService: LibraryService,
    val searchBookService: SearchBookService,
) {

    @GetMapping("offline/by-region")
    fun getLibrarySearchResultByRegion(
        @RequestParam("query") query: String,
        @RequestParam("region") region: String,
        @RequestParam("region-detail", required = false) regionDetail: String,
    ): List<OfflineLibraryResponse> {
        val isbnToBookMap: Map<String, BookSearchResult> =
            searchBookService.getBookByQueryFromAladin(query, 5).associateBy { it.isbn ?: "" }

        val result: MutableList<OfflineLibraryResponse> = mutableListOf()
        for (isbn: String in isbnToBookMap.keys) {
            val availableLibrary: List<AvailableLibrary> = libraryService.getAvailableLibraryByRegion(
                isbn,
                KoreaRegion.valueOf(region).apiRegionCode,
                SeoulRegion.valueOf(regionDetail).apiRegionCode,
            )

            if (availableLibrary.isEmpty()) continue

            result.add(
                OfflineLibraryResponse(
                    book = BookSearchResult(
                        title = isbnToBookMap[isbn]?.title ?: "?",
                        author = isbnToBookMap[isbn]?.author ?: "?",
                        cover = isbnToBookMap[isbn]?.cover ?: "?",
                        link = null,
                        isbn = isbn,
                    ),
                    libraryList = availableLibrary,
                )
            )

        }

        return result
    }

    @GetMapping("online")
    fun getOnlineLibrarySearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include") includeList: List<String>,
    ): List<OnlineLibraryResponse> {
        if (includeList.isEmpty()) throw BadRequestException()

        val result: MutableList<OnlineLibraryResponse> = mutableListOf()

        if (includeList.contains(OnlineLibraryProvider.SEOUL_EDUCATION_LIBRARY.name))
            result.addAll(libraryService.getSeoulEducationLibrarySearchResult(query))
        if (includeList.contains(OnlineLibraryProvider.SEOUL_LIBRARY.name))
            result.addAll(libraryService.getSeoulLibrarySearchResult(query, 10))
        if (includeList.contains(OnlineLibraryProvider.NATIONAL_ASSEMBLY_LIBRARY.name))
            result.addAll(libraryService.getNationalAssemblyLibrary(query))
        if (includeList.contains(OnlineLibraryProvider.GYEONGGI_EDUCATION_LIBRARY.name))
            result.addAll(libraryService.getGyeonggiEducationLibrary(query))
        if (includeList.contains(OnlineLibraryProvider.GWANGHWAMUN_LIBRARY.name))
            result.addAll(libraryService.getGwanghwamunLibrary(query))
        if (includeList.contains(OnlineLibraryProvider.SEOUL_CONGRESS_LIBRARY.name))
            result.addAll(libraryService.getSeoulCongressLibrary(query))

        return result;
    }
}