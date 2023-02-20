package com.jinkyumpark.book;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyBookSearchResult {
    private final Long bookId;
    private final String title;
    private final String author;
    private final String cover;
    private final Integer currentPage;
    private final Integer endPage;
    private final Boolean isGiveUp;
}
