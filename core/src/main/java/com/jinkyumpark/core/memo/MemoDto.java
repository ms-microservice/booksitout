package com.jinkyumpark.core.memo;

import com.jinkyumpark.core.book.model.Book;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemoDto {
    private final Integer page;
    private final String content;
    private final Long bookId;

    public Memo toEntity() {
        return Memo.builder()
                .book(Book.builder().bookId(bookId).build())
                .page(page)
                .content(content)
                .build();
    }
}
