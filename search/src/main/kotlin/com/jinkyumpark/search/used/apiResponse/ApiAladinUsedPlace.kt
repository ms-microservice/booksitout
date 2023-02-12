package com.jinkyumpark.search.used.apiResponse

data class ApiAladinUsedPlace(
    val aladinUsed: ApiAladinUsed,
    val userUsed: ApiAladinUserUsed,
    val spaceUsed: ApiAladinSpaceUsed,
)
