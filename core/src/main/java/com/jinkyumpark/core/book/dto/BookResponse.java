package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.book.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BookResponse {

    private Long id;
    private String isbn;

    private String title;
    private String author;
    private String cover;
    private String description;

    private Integer currentPage;
    private Integer endPage;
    private Boolean isGiveUp;

    public static BookResponse of(Book book) {
        String title = null;
        if (book.getBookCustom() != null && book.getBookCustom().getTitle() != null) {
            title = book.getBookCustom().getTitle();
        } else if (book.getBookIsbn() != null) {
            title = book.getBookIsbn().getTitle();
        }

        String author = null;
        if (book.getBookCustom() != null && book.getBookCustom().getAuthor() != null) {
            author = book.getBookCustom().getAuthor();
        } else if (book.getBookIsbn() != null) {
            author = book.getBookIsbn().getAuthor();
        }

        String cover = null;
        if (book.getBookCustom() != null && book.getBookCustom().getCover() != null) {
            cover = book.getBookCustom().getCover();
        } else if (book.getBookIsbn() != null && book.getBookIsbn().getCover() != null) {
            cover = book.getBookIsbn().getCover();
        }

        String isbn = null;
        if (book.getBookIsbn() != null) {
            isbn = book.getBookIsbn().getIsbn();
        }

        return BookResponse.builder()
                .id(book.getBookId())

                .title(title)
                .author(author)
                .cover(cover)
                .isbn(isbn)

                .currentPage(book.getCurrentPage())
                .endPage(book.getEndPage())

                .build();
    }

    public static BookResponse ofCover(Book book) {
        String cover = null;
        if (book.getBookCustom() != null && book.getBookCustom().getCover() != null) {
            cover = book.getBookCustom().getCover();
        } else if (book.getBookIsbn() != null && book.getBookIsbn().getCover() != null) {
            cover = book.getBookIsbn().getCover();
        }

        String isbn = null;
        if (book.getBookIsbn() != null) {
            isbn = book.getBookIsbn().getIsbn();
        }

        return BookResponse.builder()
                .id(book.getBookId())
                .cover(cover)
                .isbn(isbn)
                .build();
    }

}
