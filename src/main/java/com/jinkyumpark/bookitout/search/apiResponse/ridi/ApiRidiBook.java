package com.jinkyumpark.bookitout.search.apiResponse.ridi;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jinkyumpark.bookitout.search.provider.SubscriptionProvider;
import com.jinkyumpark.bookitout.search.response.searchResult.SubscriptionSearchResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiRidiBook {
    private String endDatetime;
    private String author;
    private String translator;
    private String ageLimit0;
    private String title;
    private String beginDatetime;
    private String author2;
    private String isDeletedfalse;
    private String webTitle;
    @JsonProperty("b_id")
    private String id;
    private String publisher;
    private String webTitleTitle;
    private List<ApiRidiAuthor> authorsInfo;

    public SubscriptionSearchResult toSubscriptionSearchResult() {
        return SubscriptionSearchResult.builder()
                .title(this.title)
                .author(
                        this.author + (this.translator != null ? String.format(", %s (번역가)", this.translator) : "")
                )
                .cover(String.format("https://img.ridicdn.net/cover/%s/small?dpi=xhdpi", this.id))
                .link(String.format("https://select.ridibooks.com/book/%s", this.id))
                .provider(SubscriptionProvider.RIDI)
                .build();
    }
}