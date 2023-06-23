package com.jinkyumpark.core.book.dto;

import com.jinkyumpark.core.book.model.book.BookForm;
import com.jinkyumpark.core.book.model.book.BookSource;
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
    private String title;

    @NotNull
    @NotBlank
    private String  author;

    private String cover;
    private LocalDateTime publishedAt;
    private String language;
    private String form = BookForm.PHYSICAL.toString();
    private String source = BookSource.NOT_PROVIDED.toString();
    @NotNull
    private Integer endPage;

    private Boolean sharing = true;
    private String category;
}