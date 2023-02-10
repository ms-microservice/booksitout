package com.jinkyumpark.bookitout.search.apiResponse.data4library.hasbook;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class HasBookResult {
    private String hasBook;
    private String loanAvailable;
}
