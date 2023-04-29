package com.jinkyumpark.search.apiResponse.google

data class ApiGoogleImageSearchResponse(
    val kind: String?,
    val url: ApiGoogleUrl?,
    val queries: ApiGoogleQueries?,
    val context: ApiGoogleContext?,
    val searchInformation: ApiGoogleSearchInformation?,
    val items: List<ApiGoogleItem>,
)

data class ApiGoogleUrl(
    val type: String?,
    val template: String?,
)

data class ApiGoogleQueries(
    val request: List<ApiGoogleRequest?>,
    val nextPage: List<ApiGoogleNextPage?>,
)

data class ApiGoogleRequest(
    val title: String?,
    val totalResults: String?,
    val searchTerms: String?,
    val count: Int?,
    val startIndex: Int?,
    val inputEncoding: String?,
    val outputEncoding: String?,
    val safe: String?,
    val cx: String?,
    val searchType: String?,
)

data class ApiGoogleNextPage(
    val title: String?,
    val totalResults: String?,
    val searchTerms: String?,
    val count: Int?,
    val startIndex: Int?,
    val inputEncoding: String?,
    val outputEncoding: String?,
    val safe: String?,
    val cx: String?,
    val searchType: String?,
)

data class ApiGoogleContext(
    val title: String?,
)

data class ApiGoogleSearchInformation(
    val searchTime: Double?,
    val formattedSearchTime: String?,
    val totalResults: String?,
    val formattedTotalResults: String?,
)

data class ApiGoogleItem(
    val kind: String?,
    val title: String?,
    val htmlTitle: String?,
    val link: String?,
    val displayLink: String?,
    val snippet: String?,
    val htmlSnippet: String?,
    val mime: String?,
    val fileFormat: String?,
    val image: ApiGoogleItemImage?,
)

data class ApiGoogleItemImage(
    val contextLink: String?,
    val height: Int?,
    val width: Int?,
    val byteSize: Int?,
    val thumbnailLink: String?,
    val thumbnailHeight: Int?,
    val thumbnailWidth: Int?,
)