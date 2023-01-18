package com.jinkyumpark.bookitout.quotation;

import com.jinkyumpark.bookitout.book.model.Book;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuotationDto {
    private final Integer page;
    private final String content;
    private final String fromWho;
    private final Long bookId;

    public Quotation toEntity() {
        return Quotation.builder()
                .page(page)
                .content(content)
                .fromWho(fromWho)
                .book(new Book(bookId))
                .build();
    }
}
