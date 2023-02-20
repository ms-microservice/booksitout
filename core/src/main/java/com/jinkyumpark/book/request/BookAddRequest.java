package com.jinkyumpark.book.request;

import com.jinkyumpark.book.model.BookForm;
import com.jinkyumpark.book.model.BookSource;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@NoArgsConstructor @AllArgsConstructor
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

    private Boolean isSharing = false;
    private String category;
}