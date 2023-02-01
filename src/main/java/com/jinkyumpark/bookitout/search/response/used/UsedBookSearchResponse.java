package com.jinkyumpark.bookitout.search.response.used;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class UsedBookSearchResponse {
    private final List<UsedBookSearchResult> online = new ArrayList<>();
    private final List<UsedBookSearchResult> offline = new ArrayList<>();

    public void addOnlineList(List<UsedBookSearchResult> toAdd) {
        this.online.addAll(toAdd);
    }

    public void addOfflineList(List<UsedBookSearchResult> toAdd) {
        this.offline.addAll(toAdd);
    }
}