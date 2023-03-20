package com.jinkyumpark.search.response.library

import com.jinkyumpark.search.response.BookSearchResult

data class OfflineLibraryResponse(
    val book: BookSearchResult,
    val libraryList: List<AvailableLibrary>,
)