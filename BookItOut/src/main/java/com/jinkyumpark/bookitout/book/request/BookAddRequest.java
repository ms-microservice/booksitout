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

    private Integer authorId;
    private String cover;
    private LocalDateTime publishedAt;
    private Integer languageId;
    private Integer bookCategoryId;

    private String source = BookSource.NOT_PROVIDED.toString();
    private Integer currentPage = 0;
    @NotNull
    private Integer endPage;
    private String summary;
}
