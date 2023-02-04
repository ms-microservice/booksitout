package com.jinkyumpark.bookitout.search.response.searchResult;

import com.jinkyumpark.bookitout.search.provider.SubscriptionProvider;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SubscriptionSearchResult {
    private String title;
    private String author;
    private String cover;
    private String link;

    private SubscriptionProvider provider;
}