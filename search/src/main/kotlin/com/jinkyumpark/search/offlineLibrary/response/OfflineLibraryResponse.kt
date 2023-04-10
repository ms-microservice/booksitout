package com.jinkyumpark.search.offlineLibrary.response

import com.jinkyumpark.search.common.SearchResult

data class OfflineLibraryResponse(
    val book: SearchResult,
    val libraryList: List<AvailableLibrary>,
)