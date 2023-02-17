package com.jinkyumpark.search.library.apiResponse.availableLibrary

data class ApiAvailableLibraryResponseResponse(
    val pageNo: String,
    val pageSize: String,
    val numFound: Int,
    val resultNum: Int,
    val libs: List<ApiAvailableLibraryLibsLib>,
)