package com.jinkyumpark.bookitout.search.apiResponse.data4library.availableLibrary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class AvailableLibraryResponseResponse {
    private String pageNo;
    private String pageSize;
    private Integer numFound;
    private Integer resultNum;
    private List<AvailableLibraryLibsLib> libs;
}
