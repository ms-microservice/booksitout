package com.jinkyumpark.bookitout.search.response;

import com.jinkyumpark.bookitout.search.response.library.OfflineLibrarySearchResultV2;
import com.jinkyumpark.bookitout.search.response.used.UsedBookSearchResult;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class AllSearchResult {
    private List<MyBookSearchResult> myBook;
    private List<OfflineLibrarySearchResultV2> library;
    private List<OfflineLibrarySearchResultV2> onlineLibrary;
    private List<SubscriptionSearchResult> subscription;
    private List<UsedBookSearchResult> usedBookOnline;
    private List<UsedBookSearchResult> usedBookOffline;
}