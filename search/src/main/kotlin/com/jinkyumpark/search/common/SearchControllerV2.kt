package com.jinkyumpark.search.common

import com.jinkyumpark.search.config.exception.BadRequestException
import com.jinkyumpark.search.offlineLibrary.OfflineLibraryService
import com.jinkyumpark.search.onlineLibrary.OnlineLibraryService
import com.jinkyumpark.search.subscription.SubscriptionService
import com.jinkyumpark.search.used.UsedSearchResponse
import com.jinkyumpark.search.used.UsedService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v2/search")
class SearchControllerV2(
    val usedService: UsedService,
    val subscriptionService: SubscriptionService,
    val onlineLibraryService: OnlineLibraryService,
    val offlineLibraryService: OfflineLibraryService,
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
            val aladinResult = usedService.getSearchResult(query, SearchProvider.ALADIN_USED_ONLINE)

            if (includeOnlineList.contains("ALADIN"))
                result.addOnlineList(aladinResult.filter { it.searchProvider == SearchProvider.ALADIN_USED_ONLINE })

            if (includeOfflineList.contains("ALADIN"))
                result.addOfflineList(aladinResult.filter { it.searchProvider == SearchProvider.ALADIN_USED_OFFLINE })
        }

        if (includeOnlineList.contains("KYOBO"))
            result.addOnlineList(usedService.getSearchResult(query, SearchProvider.KYOBO_USED_ONLINE))

        if (includeOnlineList.contains("INTERPARK"))
            result.addOnlineList(usedService.getSearchResult(query, SearchProvider.INTERPARK_USED_ONLINE))

        if (includeOnlineList.contains("YES24"))
            result.addOnlineList(usedService.getSearchResult(query, SearchProvider.YES24_USED_ONLINE))

        if (includeOfflineList.contains("YES24"))
            result.addOfflineList(usedService.getSearchResult(query, SearchProvider.YES24_USED_OFFLINE))

        return result
    }

    @GetMapping("subscription")
    fun getSubscriptionSearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include") include: List<String>,
    ): List<SearchResult> {

        return include
            .map { subscriptionService.getSearchResult(query, SearchProvider.valueOf("${it.uppercase()}_SUBSCRIPTION")) }
            .flatten()

    }

    @GetMapping("library/online")
    fun getOnlineLibrarySearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include") includeList: List<String>,
    ): List<SearchResult> {
        if (includeList.isEmpty()) throw BadRequestException()

        return includeList
            .map { SearchProvider.valueOf(it) }
            .map { onlineLibraryService.getSearchResult(query, it) }
            .flatten()
    }

}