package com.jinkyumpark.core.common.feign.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class NewBookSearchResponse {

    private String title;
    private String author;
    private String cover;
    private String isbn;
    private String link;

}