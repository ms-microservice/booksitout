package com.jinkyumpark.core.memo.request;

import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.memo.Memo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class MemoAddRequest {

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
