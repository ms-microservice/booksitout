package com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class LibrarySearchRequest {
    private String keyword;
    private Integer pageNo;
    private Integer pageSize;
}