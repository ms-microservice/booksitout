package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.book.*;
import com.jinkyumpark.core.book.model.customBook.BookCustom;
import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BookDto {

    private final String title;
    private final String author;
    private final Integer endPage;
    private final String cover;
    private final Boolean sharing;
    private final Long appUserId;
    private final Integer rating;
    private final String summary;
    private final String review;
    private final String isbn;

    private final BookForm form;
    private final BookMainCategory category;
    private final BookSource source;
    private final BookLanguage language;

    private final BookMemoType memoType;
    private final String memoLink;

    @Builder
    public BookDto(String title, String author, String cover, String isbn,
                   Boolean sharing, Long appUserId, Integer endPage,
                   String form, String category, String source, String language,
                   Integer rating, String summary, String review, String memoLink, String memoType) {
        this.title = title;
        this.author = author;
        this.endPage = endPage;
        this.cover = cover;
        this.sharing = sharing;
        this.appUserId = appUserId;
        this.rating = rating;
        this.summary = summary;
        this.review = review;
        this.memoLink = memoLink;
        this.isbn = isbn;
        this.form = form != null ? BookForm.valueOf(form) : null;
        this.category = category != null ? BookMainCategory.valueOf(category) : null;
        this.source = source != null ? BookSource.valueOf(source) : null;
        this.language = language != null ? BookLanguage.valueOf(language) : null;
        this.memoType = memoType != null ? BookMemoType.valueOf(memoType) : null;
    }

    public Book toBookEntity() {
        return Book.builder()
                .bookIsbn(BookIsbn.builder().isbn(isbn).build())

                .sharing(sharing)
                .appUserId(appUserId)

                .rating(rating)
                .endPage(endPage)

                .form(form)
                .language(language == null ? BookLanguage.UNKNOWN : language)
                .source(source == null ? BookSource.OTHERS : source)

                .build();
    }

    public BookCustom toCustomBookEntity() {
        if ((title == null || title.equals("")) &&
                (author == null || author.equals("")) &&
                (cover == null || cover.equals("")) &&
                (category == null)
        ) {
            return null;
        }

        return BookCustom.builder()
                .title(title)
                .author(author)
                .cover(cover)
                .category(category)
                .build();
    }

}
