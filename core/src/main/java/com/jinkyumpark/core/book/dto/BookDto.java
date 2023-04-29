package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.*;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BookDto {
    private final String title;
    private final String author;
    private final Integer endPage;
    private final String cover;
    private final Boolean isSharing;
    private final Long appUserId;
    private final Integer rating;
    private final String summary;
    private final String review;

    private final BookForm form;
    private final BookCategory category;
    private final BookSource source;
    private final BookLanguage language;

    private final BookMemoType memoType;
    private final String memoLink;

    @Builder
    public BookDto(String title, String author, Integer endPage, String cover, Boolean isSharing, Long appUserId,
                   String form, String category, String source, String language,
                   Integer rating, String summary, String review, String memoLink, String memoType) {
        this.title = title;
        this.author = author;
        this.endPage = endPage;
        this.cover = cover;
        this.isSharing = isSharing;
        this.appUserId = appUserId;
        this.rating = rating;
        this.summary = summary;
        this.review = review;
        this.memoLink = memoLink;

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
                .isSharing(isSharing)
                .appUserId(appUserId)
                .form(form)
                .category(category)
                .source(source)
                .language(language)
                .rating(rating)
                .summary(summary)
                .review(review)
                .endPage(endPage)
                .build();
    }
}
