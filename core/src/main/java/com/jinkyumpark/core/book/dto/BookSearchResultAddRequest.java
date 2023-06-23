package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.book.model.book.BookForm;
import com.jinkyumpark.core.book.model.book.BookMainCategory;
import com.jinkyumpark.core.book.model.book.BookSource;
import com.jinkyumpark.core.book.model.customBook.BookCustom;
import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class BookSearchResultAddRequest {

    @NotNull private String isbn;

    private String title;
    private String author;
    private String cover;

    private Integer page;
    private String category;

    @NotNull private Boolean sharing;
    private String form;
    private String source;

    public BookDto toDto(Long appUserId) {
        return BookDto.builder()
                .title(title)
                .author(author)
                .cover(cover)
                .isbn(isbn)

                .endPage(page)

                .form(form)
                .source(source)

                .sharing(sharing)

                .appUserId(appUserId)

                .build();
    }

    public Book toBookEntity(Long appUserId) {
        return Book.builder()
                .endPage(page)
                .source(BookSource.valueOf(source))
                .form(BookForm.valueOf(form))
                .sharing(sharing)
                .appUserId(appUserId)
                .bookIsbn(BookIsbn.builder()
                        .isbn(isbn)
                        .build()
                )
                .build();
    }

    public BookCustom toBookCustomEntity() {
        if (category == null) return null;

        return BookCustom.builder()
                .category(BookMainCategory.valueOf(category))
                .build();
    }

}