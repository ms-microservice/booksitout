package com.jinkyumpark.bookitout.search.apiResponse.mille;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiMillieData {
    private List<ApiMillieBook> list;
    private Integer total;
    private List<String> suggestKeyword;
}
