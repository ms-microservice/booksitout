package com.jinkyumpark.core.bookIsbn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BookIsbnDto {

    private Long isbn;
    private String title;
    private String author;
    private String cover;

    private Integer page;
    private Integer publicationYear;
    private String language;

    public static BookIsbnDto of(BookIsbn bookIsbn) {
        return BookIsbnDto.builder()
                .title(bookIsbn.getTitle())
                .author(bookIsbn.getAuthor())
                .cover(bookIsbn.getCover())
                .isbn(Long.valueOf(bookIsbn.getIsbn()))

                .page(bookIsbn.getPage())
                .publicationYear(bookIsbn.getPublicationYear())
                .language(bookIsbn.getLanguage().toString())

                .build();
    }

    public BookIsbn toEntity() {
        return BookIsbn.builder()
                .isbn(String.valueOf(isbn))
                .title(title)
                .author(author)
                .cover(cover)
                .build();
    }

}
