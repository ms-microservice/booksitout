package com.jinkyumpark.bookitout.memo;

import com.jinkyumpark.bookitout.book.model.Book;
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
                .book(new Book(bookId))
                .page(page)
                .content(content)
                .build();
    }
}
