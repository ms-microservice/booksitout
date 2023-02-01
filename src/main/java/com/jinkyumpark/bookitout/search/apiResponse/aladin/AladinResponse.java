package com.jinkyumpark.bookitout.search.apiResponse.aladin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class AladinResponse {
    private String version;
    private String logo;
    private String title;
    private String link;
    private String pubDate;
    private Integer totalResults;
    private Integer startIndex;
    private Integer itemsPerPage;
    private String query;
    private Integer searchCategoryId;
    private String searchCategoryName;
    private String imageUrl;

    private List<AladinItem> item;
}