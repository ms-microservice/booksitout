package com.jinkyumpark.bookitout.search.response.library;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OfflineLibraryAvailableSearchResult {
    private String isbn;
    private Integer libraryCode;
    private Boolean isLoanPossible;
}
