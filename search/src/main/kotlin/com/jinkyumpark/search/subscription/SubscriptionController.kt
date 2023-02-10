package com.jinkyumpark.search.subscription

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("v2/search/subscription")
@RestController
class SubscriptionController(
    val subscriptionService: SubscriptionService
) {

    @GetMapping
    fun getSubscriptionSearchResult(
        @RequestParam("query") query: String,
        @RequestParam("include") include: List<String>,
    ): List<SubscriptionSearchResponse> {

        val result: MutableList<SubscriptionSearchResponse> = ArrayList()

        if (include.contains("MILLIE")) {
            result.addAll(subscriptionService.getMillie(query))
        }

        if (include.contains("YES24")) {
            result.addAll(subscriptionService.getYes24(query))
        }

        if (include.contains("RIDI")) {
            result.addAll(subscriptionService.getRidi(query))
        }

        if (include.contains("KYOBO")) {
            result.addAll(subscriptionService.getKyobo(query))
        }

        return result
    }

}