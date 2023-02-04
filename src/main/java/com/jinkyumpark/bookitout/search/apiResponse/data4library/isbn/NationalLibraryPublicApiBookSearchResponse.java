package com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class NationalLibraryPublicApiBookSearchResponse {
    private String bookname;
    private String authors;
    private String publisher;
    private String publication_year;
    private String isbn13;
    private String vol;
    private String bookImageURL;
    private String bookDtlUrl;
    private String loan_count;
}