package com.jinkyumpark.search.subscription.apiResponse.ridi

import com.fasterxml.jackson.annotation.JsonProperty
import com.jinkyumpark.search.subscription.SubscriptionProvider
import com.jinkyumpark.search.subscription.SubscriptionSearchResponse

data class ApiRidiBook(
    var endDatetime: String?,
    val author: String?,
    val translator: String?,
    val ageLimit0: String?,
    val title: String,
    val beginDatetime: String?,
    val author2: String?,
    val isDeletedfalse: String?,
    val webTitle: String?,

    @JsonProperty("b_id")
    val id: String?,

    val publisher: String?,
    val webTitleTitle: String?,
    val authorsInfo: List<ApiRidiAuthor>?,
) {
    fun toSubscriptionSearchResponse(): SubscriptionSearchResponse {
        return SubscriptionSearchResponse(
            title=title,
            author="$author, $translator (번역가)",
            cover="https://img.ridicdn.net/cover/$id/small?dpi=xhdpi",
            link="https://select.ridibooks.com/book/$id",
            provider = SubscriptionProvider.RIDI,
        )
    }
}
