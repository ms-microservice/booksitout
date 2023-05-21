package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BookResponse {

    private Long id;

    private String title;
    private String author;
    private String cover;
    private Long isbn;

    private Integer currentPage;
    private Integer endPage;

    public static BookResponse of(Book book) {
        return BookResponse.builder()
                .id(book.getBookId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .cover(book.getCover())
                .isbn(book.getIsbn13())
                .currentPage(book.getCurrentPage())
                .endPage(book.getEndPage())
                .build();
    }

}
