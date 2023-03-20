package com.jinkyumpark.search

import com.jinkyumpark.search.apiResponse.aladin.ApiAladinItem
import com.jinkyumpark.search.response.BookSearchResult
import com.jinkyumpark.search.service.CommonService
import com.jinkyumpark.search.common.exception.BadRequestException
import com.jinkyumpark.search.service.LibraryService
import com.jinkyumpark.search.provider.OnlineLibraryProvider
import com.jinkyumpark.search.provider.SearchProvider
import com.jinkyumpark.search.region.KoreaRegion
import com.jinkyumpark.search.region.SeoulRegion
import com.jinkyumpark.search.response.library.AvailableLibrary
import com.jinkyumpark.search.response.library.OfflineLibraryResponse
import com.jinkyumpark.search.response.library.OnlineLibraryResponse
import com.jinkyumpark.search.service.SubscriptionService
import com.jinkyumpark.search.provider.UsedBookProvider
import com.jinkyumpark.search.response.used.UsedSearchResponse
import com.jinkyumpark.search.service.UsedService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v2/search")
class SearchController(
    val usedService: UsedService,
    val subscriptionService: SubscriptionService,
    val libraryService: LibraryService,

    val commonService: CommonService,
) {

    @GetMapping("used")
    fun getUsedSearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include-online", required = false) includeOnlineList: List<String> = listOf(),
        @RequestParam("include-offline", required = false) includeOfflineList: List<String> = listOf(),
    ): UsedSearchResponse {

        if (includeOnlineList.isEmpty() && includeOfflineList.isEmpty()) throw BadRequestException()

        val result = UsedSearchResponse(mutableListOf(), mutableListOf())

        if (includeOnlineList.contains("ALADIN") || includeOfflineList.contains("ALADIN")) {
            val apiAladinItemList: List<ApiAladinItem> = usedService.getAladinUsedBook(query)

            if (includeOnlineList.contains("ALADIN")) {
                result.addOnlineList(apiAladinItemList
                    .filter { it.subInfo?.usedList?.aladinUsed?.itemCount != 0 }
                    .map { it.toUsedSearchBook(UsedBookProvider.ONLINE_ALADIN) }
                )
            }

            if (includeOfflineList.contains("ALADIN")) {
                result.addOfflineList(apiAladinItemList
                    .filter { it.subInfo?.usedList?.spaceUsed?.itemCount != 0 }
                    .map { it.toUsedSearchBook(UsedBookProvider.OFFLINE_ALADIN) }
                )
            }
        }

        if (includeOnlineList.contains("KYOBO"))
            result.addOnlineList(usedService.getKyoboOnlineUsedBook(query))

        if (includeOnlineList.contains("INTERPARK"))
            result.addOnlineList(usedService.getInterparkOnlineUsedBook(query))

        if (includeOnlineList.contains("YES24"))
            result.addOnlineList(usedService.getYes24OnlineUsedBook(query))

        if (includeOfflineList.contains("YES24"))
            result.addOfflineList(usedService.getYes24OfflineUsedBook(query))

        return result
    }

    @GetMapping("subscription")
    fun getSubscriptionSearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include") include: List<String>,
    ): List<BookSearchResult> {

        return include
            .map { subscriptionService.getSearchResult(query, SearchProvider.valueOf("${it.uppercase()}_SUBSCRIPTION")) }
            .flatten()

    }

    @GetMapping("library/offline/by-region")
    fun getLibrarySearchResultByRegion(
        @RequestParam("query") query: String,
        @RequestParam("region") region: String,
        @RequestParam("region-detail", required = false) regionDetail: String,
    ): List<OfflineLibraryResponse> {
        val isbnToBookMap: Map<String, BookSearchResult> =
            commonService.getBookByQueryFromAladin(query, 5).associateBy { it.isbn ?: "" }

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
                        provider = SearchProvider.LIBRARY_OFFLINE,
                    ),
                    libraryList = availableLibrary,
                )
            )

        }

        return result
    }

    @GetMapping("library/online")
    fun getOnlineLibrarySearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include") includeList: List<String>,
    ): List<OnlineLibraryResponse> {
        if (includeList.isEmpty()) throw BadRequestException()

        return includeList
            .map { OnlineLibraryProvider.valueOf(it) }
            .map { libraryService.getSearchResult(query, it) }
            .flatten()
    }

}