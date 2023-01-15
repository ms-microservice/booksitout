package com.jinkyumpark.bookitout.request.book;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BookEditRequest {
    private String title;
    private String author;
    private String language;
    private String category;
    private Integer endPage;
    private String cover;
    private String source;
    private Boolean isSharing;
    private Integer rating;
    private String summary;
    private String review;
}
