package com.jinkyumpark.community.config.feign.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BookInfo {

    private String title;
    private String author;
    private String cover;
    private Long isbn;

}