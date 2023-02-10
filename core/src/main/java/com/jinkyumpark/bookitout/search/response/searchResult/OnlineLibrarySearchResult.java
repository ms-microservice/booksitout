package com.jinkyumpark.bookitout.search.response.searchResult;

import com.jinkyumpark.bookitout.search.provider.OnlineLibraryProvider;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OnlineLibrarySearchResult {
    private String title;
    private String author;
    private String cover;
    private String link;

    private Boolean loanPossible;
    private Boolean reservationPossible;

    private OnlineLibraryProvider provider;
}
