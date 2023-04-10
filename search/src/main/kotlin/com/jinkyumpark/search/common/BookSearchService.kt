package com.jinkyumpark.search.common

interface BookSearchService {
    fun getSearchResult(query: String, provider: SearchProvider): List<SearchResult>
}