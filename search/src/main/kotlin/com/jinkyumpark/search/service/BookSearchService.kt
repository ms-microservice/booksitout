package com.jinkyumpark.search.service

import com.jinkyumpark.search.response.BookSearchResult
import com.jinkyumpark.search.provider.SearchProvider

interface BookSearchService {
    fun getSearchResult(query: String, provider: SearchProvider): List<BookSearchResult>
}