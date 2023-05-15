package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class RecentBookResponse {

    private Long bookId;

    private String title;
    private String author;
    private String cover;

    private Long isbn;

    public static RecentBookResponse of(Book book) {
        return RecentBookResponse.builder()
                .bookId(book.getBookId())

                .title(book.getTitle())
                .author(book.getAuthor())
                .cover(book.getCover())
                .isbn(book.getIsbn13())

                .build();
    }
}