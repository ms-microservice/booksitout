package com.jinkyumpark.search.offlineLibrary.response

data class AvailableLibraryResponse(
    val id: Long,
    val name: String,
    val icon: String,
    val link: String?,
    val address: String,
    val added: Boolean = false,
)