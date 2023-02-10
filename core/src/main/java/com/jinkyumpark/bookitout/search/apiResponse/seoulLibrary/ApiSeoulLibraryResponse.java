package com.jinkyumpark.bookitout.search.apiResponse.seoulLibrary;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiSeoulLibraryResponse {
    private String codeMessage;
    private String totalPage;
    private Integer statusCode;

    @JsonProperty("ContentDataList")
    private List<ApiSeoulLibraryBook> bookList;
}
