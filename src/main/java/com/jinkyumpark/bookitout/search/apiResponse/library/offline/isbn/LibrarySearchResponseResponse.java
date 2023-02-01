package com.jinkyumpark.bookitout.search.apiResponse.library.offline.isbn;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class LibrarySearchResponseResponse {
    private LibrarySearchRequest request;
    private Integer numFound;
    private List<LibrarySearchDoc> docs;
}