package com.jinkyumpark.core.book.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class BookSearchResultAddRequest {

    @NotNull private String title;
    @NotNull private String author;
    @NotNull private String isbn;
    private String cover;

    private Integer page;
    private String  form;
    private String source;
    @NotNull private Boolean sharing;

}