package com.jinkyumpark.search.used

import com.jinkyumpark.search.common.SearchResult

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
