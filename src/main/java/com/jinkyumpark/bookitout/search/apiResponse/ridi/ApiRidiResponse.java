package com.jinkyumpark.bookitout.search.apiResponse.ridi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiRidiResponse {
    private List<ApiRidiBook> books;
}
