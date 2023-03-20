package com.jinkyumpark.search.response.library

import com.jinkyumpark.search.response.SearchResult

data class OfflineLibraryResponse(
    val book: SearchResult,
    val libraryList: List<AvailableLibrary>,
)