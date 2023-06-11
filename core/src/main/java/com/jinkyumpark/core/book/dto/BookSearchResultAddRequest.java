package com.jinkyumpark.core.book.dto;

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

    public BookDto toDto(Long appUserId) {
        return BookDto.builder()
                .title(title)
                .author(author)
                .cover(cover)
                .isbn13(Long.valueOf(isbn))

                .endPage(page)

                .form(form)
                .source(source)

                .sharing(sharing)

                .appUserId(appUserId)

                .build();
    }

}