package com.jinkyumpark.search.library.response

import com.jinkyumpark.search.bookSearch.BookSearchResult

data class OfflineLibraryResponse(
    val book: BookSearchResult,
    val libraryList: List<AvailableLibrary>,
)