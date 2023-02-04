package com.jinkyumpark.bookitout.book.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
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

    private String bookMemoType;
    private String bookMemoLink;
}
