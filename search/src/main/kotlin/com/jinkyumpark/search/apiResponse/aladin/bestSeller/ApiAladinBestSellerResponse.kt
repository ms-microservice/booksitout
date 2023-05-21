package com.jinkyumpark.search.apiResponse.aladin.bestSeller

data class ApiAladinBestSellerResponse(
    val version: String,
    val logo: String,
    val title: String,
    val link: String,
    val pubDate: String,
    val totalResults: Int,
    val startIndex: Int,
    val itemsPerPage: Int,
    val query: String,
    val searchCategoryId: Int,
    val searchCategoryName: String,
    val item: List<ApiAladinBestSellerBook>
)

data class ApiAladinBestSellerBook(
    val title: String,
    val link: String,
    val author: String,
    val pubDate: String,
    val description: String,
    val isbn: String,
    val isbn13: String,
    val itemId: Long,
    val priceSales: Int,
    val priceStandard: Int,
    val mallType: String,
    val stockStatus: String,
    val mileage: Int,
    val cover: String,
    val categoryId: Int,
    val categoryName: String,
    val publisher: String,
    val salesPoint: Int,
    val adult: Boolean,
    val fixedPrice: Boolean,
    val customerReviewRank: Int,
    val bestRank: Int,
    val subInfo: Map<String, Any>
)