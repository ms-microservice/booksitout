package com.jinkyumpark.search.library.apiResponse.seoulLibrary

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiSeoulLibraryResponse(
    var codeMessage: String,
    var totalPage: String,
    var statusCode: Int,

    @JsonProperty("ContentDataList")
    var bookList: List<ApiSeoulLibraryBook>,
)
