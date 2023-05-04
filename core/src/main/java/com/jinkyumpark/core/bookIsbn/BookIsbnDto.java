package com.jinkyumpark.core.bookIsbn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BookIsbnDto {

    private int isbn13;
    private String title;
    private String author;
    private String cover;

    public static BookIsbnDto of(BookIsbn bookIsbn) {
        return BookIsbnDto.builder()
                .title(bookIsbn.getTitle())
                .author(bookIsbn.getAuthor())
                .cover(bookIsbn.getCover())
                .isbn13(bookIsbn.getIsbn13())
                .build();
    }

    public BookIsbn toEntity() {
        return BookIsbn.builder()
                .isbn13(isbn13)
                .title(title)
                .author(author)
                .cover(cover)
                .build();
    }

}
