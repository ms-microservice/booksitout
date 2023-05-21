package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.*;
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

    private final Long isbn13;

    private final BookForm form;
    private final BookCategory category;
    private final BookSource source;
    private final BookLanguage language;

    private final BookMemoType memoType;
    private final String memoLink;

    @Builder
    public BookDto(String title, String author, String cover, Long isbn13,
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
        this.isbn13 = isbn13;

        this.form = form != null ? BookForm.valueOf(form) : null;
        this.category = category != null ? BookCategory.valueOf(category) : null;
        this.source = source != null ? BookSource.valueOf(source) : null;
        this.language = language != null ? BookLanguage.valueOf(language) : null;
        this.memoType = memoType != null ? BookMemoType.valueOf(memoType) : null;
    }

    public Book toEntity() {
        return Book.builder()
                .title(title)
                .author(author)
                .cover(cover)
                .isbn13(isbn13)

                .sharing(sharing)
                .appUserId(appUserId)

                .rating(rating)
                .summary(summary)
                .review(review)
                .endPage(endPage)

                .form(form)
                .category(category == null ? BookCategory.OTHERS : category)
                .language(language == null ? BookLanguage.UNKNOWN : language)
                .source(source == null ? BookSource.OTHERS : source)

                .build();
    }

}
