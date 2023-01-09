package com.jinkyumpark.bookitout.app.memo.request;

import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.memo.Memo;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class MemoAddRequest {
    @NotNull
    private Integer page;

    @NotNull
    @NotBlank
    private String content;

    public Memo toEntity(Book book) {
        return Memo.builder()
                .book(book)
                .page(page)
                .content(content)
                .build();
    }
}
