package com.jinkyumpark.bookitout.search.apiResponse.library.offline.hasbook;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class HasBookRequest {
    private String isbn13;
    private String libCode;
}