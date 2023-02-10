package com.jinkyumpark.bookitout.search.apiResponse.mille;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiMillieResponse {
    @JsonProperty("RESP_CD")
    private Integer respCd;

    @JsonProperty("RESP_MSG")
    private String respMsg;

    @JsonProperty("RESP_DATA")
    private ApiMillieData respData;

    @JsonProperty("RESP_HOST")
    private String respHost;
}
