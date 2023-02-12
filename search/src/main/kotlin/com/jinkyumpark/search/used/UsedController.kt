package com.jinkyumpark.search.used

import com.jinkyumpark.search.common.exception.BadRequestException
import com.jinkyumpark.search.used.apiResponse.ApiAladinItem
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v2/search/used")
class UsedController(
    val usedService: UsedService,
) {

    @GetMapping
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

}