package com.jinkyumpark.search.used.apiResponse

data class ApiAladinUsedList(
    val aladinUsed: ApiAladinUsed,
    val userUsed: ApiAladinUserUsed,
    val spaceUsed: ApiAladinSpaceUsed,
)
