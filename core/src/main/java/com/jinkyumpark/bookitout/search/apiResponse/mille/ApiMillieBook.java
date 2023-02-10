package com.jinkyumpark.bookitout.search.apiResponse.mille;

import com.jinkyumpark.bookitout.search.provider.SubscriptionProvider;
import com.jinkyumpark.bookitout.search.response.searchResult.SubscriptionSearchResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiMillieBook {

    private String book_seq;
    private String content_name;
    private String category;
    private String category2;
    private String category_seq;
    private String category_seq2;
    private String content_thumb_url;
    private String subtitle;
    private String view_percent;
    private String view_time;
    private String author;
    private String content_code;
    private String audiobook_volume;
    private String audio_category_icon_value;
    private String audio_reader_icon_value;
    private String reader_name;
    private String reader_job;
    private String is_service;
    private String is_free;
    private String is_adult;
    private String is_b2b;
    private String is_series;
    private String is_series_complete;
    private String book_kind_code;
    private String series_count;
    private String series_group_name;
    private String series_type;
    private String coming_soon_date;
    private String is_ebook_rent;
    private String book_brand;
    private String content_take_count;
    private String content_review_count;
    private String ebook_published_at;

    public SubscriptionSearchResult toSubscriptionSearchResult() {
        return SubscriptionSearchResult.builder()
                .title(this.content_name)
                .author(this.author)
                .cover(this.content_thumb_url)
                .link("https://www.millie.co.kr/v3/bookDetail/" + this.book_seq)
                .provider(SubscriptionProvider.MILLIE)
                .build();
    }
}


