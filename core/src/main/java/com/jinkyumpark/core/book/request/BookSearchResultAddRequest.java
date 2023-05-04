package com.jinkyumpark.core.book.request;

import com.jinkyumpark.core.book.dto.BookDto;
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
                .endPage(page)
                .cover(cover)
                .isSharing(sharing)
                .appUserId(appUserId)
                .form(form)
                .source(source)
                .build();
    }

}