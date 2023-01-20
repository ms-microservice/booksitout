package com.jinkyumpark.bookitout.book.request;

import com.jinkyumpark.bookitout.book.model.BookSource;
import com.jinkyumpark.bookitout.book.model.BookForm;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class BookAddRequest {
    @NotNull
    @NotBlank
    private final String title;

    @NotNull
    @NotBlank
    private final String  author;

    private final String cover;
    private final LocalDateTime publishedAt;
    private final String language;
    private final String form = BookForm.PHYSICAL.toString();
    private final String source = BookSource.NOT_PROVIDED.toString();
    @NotNull
    private final Integer endPage;

    private final Boolean isSharing = false;
    private final String category;
}