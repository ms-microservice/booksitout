package com.jinkyumpark.bookitout.book.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BookEditRequest {
    private String title;
    private String cover;
    private String summary;

    private String source;
    private String review;

    private Boolean isSharing;

    private Integer currentPage;
}
