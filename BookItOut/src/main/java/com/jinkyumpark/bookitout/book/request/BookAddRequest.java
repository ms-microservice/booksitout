package com.jinkyumpark.bookitout.book.request;

import com.jinkyumpark.bookitout.book.BookSource;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
public class BookAddRequest {
    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private String  author;

    private String cover;
    private LocalDateTime publishedAt;
    private String language;
    private String source = BookSource.NOT_PROVIDED.toString();
    @NotNull
    private Integer endPage;

    // FK
    private Integer bookCategoryId;
}