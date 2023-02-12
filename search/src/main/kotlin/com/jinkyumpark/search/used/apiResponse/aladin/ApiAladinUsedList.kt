package com.jinkyumpark.search.used.apiResponse.aladin

data class ApiAladinUsedList(
    val aladinUsed: ApiAladinUsed,
    val userUsed: ApiAladinUserUsed,
    val spaceUsed: ApiAladinSpaceUsed,
)
