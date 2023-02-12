package com.jinkyumpark.search.used

data class UsedSearchResponse(
    val online: MutableList<UsedSearchBook>,
    val offline: MutableList<UsedSearchBook>,
) {

    fun addOnlineList(toAdd: List<UsedSearchBook>) {
        online.addAll(toAdd)
    }

    fun addOfflineList(toAdd: List<UsedSearchBook>) {
        offline.addAll(toAdd)
    }
}
