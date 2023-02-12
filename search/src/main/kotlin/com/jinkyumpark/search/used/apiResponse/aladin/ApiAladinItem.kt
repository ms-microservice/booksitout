package com.jinkyumpark.search.used.apiResponse.aladin

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
)