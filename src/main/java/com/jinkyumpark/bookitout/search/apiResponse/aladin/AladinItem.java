package com.jinkyumpark.bookitout.search.apiResponse.aladin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class AladinItem {
    private String title;
    private String link;
    private String author;

    private String pubDate;
    private String description;
    private String isbn;
    private String isbn13;
    private Integer itemId;
    private String mallType;
    private Integer mileage;
    private Integer categoryId;
    private String categoryName;
    private String publisher;
    private Integer salesPoint;
    private Boolean adult;
    private Boolean fixedPrice;
    private Integer customerReviewRank;
    private String creator;
    private AladinSeriesInfo seriesInfo;

    private Integer priceSales;
    private Integer priceStandard;

    private String stockStatus;

    private String cover;

    private AladinSubInfo subInfo;
}