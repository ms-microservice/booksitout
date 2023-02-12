package com.jinkyumpark.search.library.apiResponse.availableLibrary

data class ApiAvailableLibraryLib(
    val libCode: String,
    val libName: String,
    val address: String,
    val tel: String,
    val fax: String,
    val latitude: String,
    val longitude: String,
    val homepage: String,
    val closed: String,
    val operatingTime: String,
)
