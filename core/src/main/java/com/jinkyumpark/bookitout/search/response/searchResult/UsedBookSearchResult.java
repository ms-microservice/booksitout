package com.jinkyumpark.bookitout.search.response.searchResult;

import com.jinkyumpark.bookitout.search.provider.UsedBookProvider;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UsedBookSearchResult {
    private final UsedBookProvider provider;

    private final String title;
    private final String author;
    private final String cover;

    private final String link;

    private final Integer stockCount;
    private final Integer minPrice;

    private final List<String> locationList;
}