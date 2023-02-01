package com.jinkyumpark.bookitout.search.response.library;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OfflineLibraryLibrarySearchResult {
    private final String name;
    private final String logo;
    private final String link;
}