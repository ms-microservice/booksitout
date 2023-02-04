package com.jinkyumpark.bookitout.search.response.library;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class LibrarySearchResult {
    private LibraryBook book;
    private List<AvailableLibrary> libraryList;
}
