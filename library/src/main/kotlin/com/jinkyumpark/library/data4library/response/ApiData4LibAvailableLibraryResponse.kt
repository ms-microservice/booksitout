package com.jinkyumpark.library.data4library.response

data class ApiData4LibraryAvailableLibraryResponse(
    val response: ApiData4LibraryAvailableLibraryResponseResponse
)

data class ApiData4LibraryAvailableLibraryResponseResponse(
    val request: ApiData4LibraryAvailableLibraryResponseRequest,
    val pageNo: Int,
    val pageSize: Int,
    val numFound: Int,
    val resultNum: Int,
    val libs: List<ApiData4LibraryAvailableLibraryResponseLibrary>
)

data class ApiData4LibraryAvailableLibraryResponseRequest(
    val pageNo: String,
    val pageSize: String,
)

data class ApiData4LibraryAvailableLibraryResponseLibrary(
    val lib: ApiData4LibraryAvailableLibraryResponseLibraryLib,
)

data class ApiData4LibraryAvailableLibraryResponseLibraryLib(
    val libCode: String,
    val libName: String,
    val address: String,
    val tel: String,
    val fax: String?,
    val latitude: String,
    val longitude: String,
    val homepage: String?,
    val closed: String,
    val operatingTime: String,
    val BookCount: String,
)