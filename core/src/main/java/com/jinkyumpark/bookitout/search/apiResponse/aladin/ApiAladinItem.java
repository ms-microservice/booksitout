package com.jinkyumpark.bookitout.search.apiResponse.aladin;

import com.jinkyumpark.bookitout.search.provider.UsedBookProvider;
import com.jinkyumpark.bookitout.search.response.searchResult.UsedBookSearchResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiAladinItem {
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
    private ApiAladinSeriesInfo seriesInfo;

    private Integer priceSales;
    private Integer priceStandard;

    private String stockStatus;

    private String cover;

    private ApiAladinSubInfo subInfo;

    public UsedBookSearchResult toUsedBookSearchResult(UsedBookProvider usedBookProvider) {
        return UsedBookSearchResult.builder()
                .provider(usedBookProvider)

                .title(this.title)
                .author(this.author)
                .cover(this.cover)

                .stockCount(
                        usedBookProvider == UsedBookProvider.ONLINE_ALADIN ?
                        this.subInfo.getUsedList().getAladinUsed().getItemCount() : this.subInfo.getUsedList().getSpaceUsed().getItemCount()
                )
                .minPrice(
                        usedBookProvider == UsedBookProvider.ONLINE_ALADIN ?
                                this.subInfo.getUsedList().getAladinUsed().getMinPrice() : this.subInfo.getUsedList().getSpaceUsed().getMinPrice()
                )
                .link(
                        usedBookProvider == UsedBookProvider.ONLINE_ALADIN ?
                                this.subInfo.getUsedList().getAladinUsed().getLink().replaceAll("amp;", "") :
                                this.subInfo.getUsedList().getSpaceUsed().getLink().replaceAll("amp;", "")
                )

                .locationList(List.of())
                .build();
    }
}