package com.jinkyumpark.search.response.used

import com.jinkyumpark.search.response.SearchResult

data class UsedSearchResponse(
    val online: MutableList<SearchResult>,
    val offline: MutableList<SearchResult>,
) {

    fun addOnlineList(toAdd: List<SearchResult>) {
        online.addAll(toAdd)
    }

    fun addOfflineList(toAdd: List<SearchResult>) {
        offline.addAll(toAdd)
    }
}
