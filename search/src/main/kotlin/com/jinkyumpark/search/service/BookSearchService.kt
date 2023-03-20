package com.jinkyumpark.search.service

import com.jinkyumpark.search.response.SearchResult
import com.jinkyumpark.search.provider.SearchProvider
import org.springframework.cache.annotation.Cacheable

interface BookSearchService {
    fun getSearchResult(query: String, provider: SearchProvider): List<SearchResult>
}