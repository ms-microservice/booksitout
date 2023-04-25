package com.jinkyumpark.search.apiResponse.aladin

import com.jinkyumpark.search.common.SearchProvider
import com.jinkyumpark.search.common.SearchResult

data class ApiAladinItem(
    var title: String?,
    val link: String?,
    val author: String?,
    val pubDate: String?,
    val description: String?,
    val isbn: String?,
    val isbn13: String?,
    val itemId: Int?,
    val mallType: String?,
    val mileage: Int?,
    val categoryId: Int?,
    val categoryName: String?,
    val publisher: String?,
    val salesPoint: Int?,
    val adult: Boolean?,
    val fixedPrice: Boolean?,
    val customerReviewRank: Int?,
    val creator: String?,
    val seriesInfo: ApiAladinSeriesInfo?,

    val priceSales: Int?,
    val priceStandard: Int?,

    val stockStatus: String?,

    val cover: String?,

    val subInfo: ApiAladinSubInfo?,
) {

    fun toSearchResult(provider: SearchProvider): SearchResult {
        return SearchResult(
            searchProvider = provider,
            title = title ?: "?",
            author = author ?: "?",
            cover = cover ?: "",
            link =
                if (provider == SearchProvider.ALADIN_USED_ONLINE) subInfo?.usedList?.aladinUsed?.link?.replace("amp;".toRegex(), "") ?: ""
                else subInfo?.usedList?.spaceUsed?.link?.replace("amp;".toRegex(), "") ?: ""
            ,
            stockCount =
                if (provider == SearchProvider.ALADIN_USED_ONLINE) subInfo?.usedList?.aladinUsed?.itemCount ?: 0
                else subInfo?.usedList?.spaceUsed?.itemCount ?: 0
            ,
            minPrice =
                if (provider == SearchProvider.ALADIN_USED_ONLINE) subInfo?.usedList?.aladinUsed?.minPrice ?: 0
                else subInfo?.usedList?.spaceUsed?.minPrice ?: 0
            ,
        )
    }

}