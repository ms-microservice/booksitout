package com.jinkyumpark.bookitout.book.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class BookAddRequest {
    @NotNull
    private String title;
    @NotNull
    private Integer authorId;

    private String cover;
    private LocalDateTime publishedAt;
    private Integer page;
    private String summary;
    private Integer languageId;
}
