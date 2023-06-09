package com.jinkyumpark.core.common.feign.response;

import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class BookDetailResponse {
    private Long isbn;
    private String title;
    private String author;
    private String cover;
    private String description;
    private String publisher;
    private LocalDate publishDate;

    public BookIsbn toEntity() {
        return BookIsbn.builder()
                .isbn(String.valueOf(isbn))
                .title(title)
                .author(author)
                .cover(cover)
                .description(description)
                .build();
    }

}