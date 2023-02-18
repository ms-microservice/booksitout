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

        return include
            .map { subscriptionService.getSearchResult(query, SubscriptionProvider.valueOf(it)) }
            .flatten()

    }

}