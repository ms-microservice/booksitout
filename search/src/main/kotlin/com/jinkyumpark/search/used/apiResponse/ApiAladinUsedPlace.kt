package com.jinkyumpark.search.used.apiResponse

import com.jinkyumpark.search.used.apiResponse.aladin.ApiAladinSpaceUsed
import com.jinkyumpark.search.used.apiResponse.aladin.ApiAladinUsed
import com.jinkyumpark.search.used.apiResponse.aladin.ApiAladinUserUsed

data class ApiAladinUsedPlace(
    val aladinUsed: ApiAladinUsed,
    val userUsed: ApiAladinUserUsed,
    val spaceUsed: ApiAladinSpaceUsed,
)
