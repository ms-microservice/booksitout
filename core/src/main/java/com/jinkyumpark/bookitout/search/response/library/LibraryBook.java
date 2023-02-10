package com.jinkyumpark.bookitout.search.response.library;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LibraryBook {
    private final String title;
    private final String author;
    private final String cover;
}