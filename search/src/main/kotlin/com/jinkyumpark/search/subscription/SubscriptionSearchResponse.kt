package com.jinkyumpark.search.subscription

import com.jinkyumpark.search.subscription.SubscriptionProvider

data class SubscriptionSearchResponse(
    val title: String,
    val author: String,
    val cover: String?,
    val link: String,
    val provider: SubscriptionProvider,
)