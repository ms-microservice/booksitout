package com.jinkyumpark.bookitout.request.memo;

import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.model.Memo;
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
