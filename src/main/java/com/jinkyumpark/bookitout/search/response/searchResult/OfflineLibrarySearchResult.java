package com.jinkyumpark.bookitout.search.response.searchResult;

import com.jinkyumpark.bookitout.search.response.library.AvailableLibrary;
import com.jinkyumpark.bookitout.search.response.library.LibraryBook;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class OfflineLibrarySearchResult {
    private LibraryBook book;
    private List<AvailableLibrary> libraryList;
}
