package com.jinkyumpark.bookitout.search.response.used;

import lombok.Builder;
import lombok.Getter;

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

    private final String location;
}