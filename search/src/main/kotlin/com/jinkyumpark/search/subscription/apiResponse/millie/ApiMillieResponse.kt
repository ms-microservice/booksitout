package com.jinkyumpark.search.subscription.apiResponse.millie

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiMillieResponse(
    @JsonProperty("RESP_CD")
    val respCd: Int?,

    @JsonProperty("RESP_MSG")
    val respMsg: String?,

    @JsonProperty("RESP_DATA")
    val respData: ApiMillieData?,

    @JsonProperty("RESP_HOST")
    val respHost: String?,
)