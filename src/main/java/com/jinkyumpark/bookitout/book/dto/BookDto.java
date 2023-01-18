package com.jinkyumpark.bookitout.book.dto;

import com.jinkyumpark.bookitout.book.model.*;
import com.jinkyumpark.bookitout.user.AppUser;
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

    @Builder
    public BookDto(String title, String author, Integer endPage, String cover, Boolean isSharing, Long appUserId,
                   String form, String category, String source, String language,
                   Integer rating, String summary, String review) {
        this.title = title;
        this.author = author;
        this.endPage = endPage;
        this.cover = cover;
        this.isSharing = isSharing;
        this.appUserId = appUserId;
        this.rating = rating;
        this.summary = summary;
        this.review = review;

        this.form = BookForm.valueOf(form);
        this.category = BookCategory.valueOf(category);
        this.source = BookSource.valueOf(source);
        this.language = BookLanguage.valueOf(language);
    }

    public Book toEntity() {
        return Book.builder()
                .title(title)
                .author(author)
                .cover(cover)
                .isGiveUp(isSharing)
                .appUser(new AppUser(appUserId))
                .form(form)
                .category(category)
                .source(source)
                .language(language)
                .rating(rating)
                .summary(summary)
                .review(review)
                .build();
    }
}
