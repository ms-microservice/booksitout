package com.jinkyumpark.search.apiResponse.aladin

import com.jinkyumpark.search.used.UsedBookProvider
import com.jinkyumpark.search.used.UsedSearchBook

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

    fun toUsedSearchBook(provider: UsedBookProvider): UsedSearchBook {
        return UsedSearchBook(
            provider = provider,
            title = title ?: "?",
            author = author ?: "?",
            cover = cover ?: "",
            link =
                if (provider == UsedBookProvider.ONLINE_ALADIN) subInfo?.usedList?.aladinUsed?.link?.replace("amp;".toRegex(), "") ?: ""
                else subInfo?.usedList?.spaceUsed?.link?.replace("amp;".toRegex(), "") ?: ""
            ,
            stockCount =
                if (provider == UsedBookProvider.ONLINE_ALADIN) subInfo?.usedList?.aladinUsed?.minPrice ?: 0
                else subInfo?.usedList?.aladinUsed?.minPrice ?: 0
            ,
            minPrice =
                if (provider == UsedBookProvider.ONLINE_ALADIN) subInfo?.usedList?.aladinUsed?.minPrice ?: 0
                else subInfo?.usedList?.spaceUsed?.minPrice ?: 0
            ,
            locationList = listOf()
        )
    }

}