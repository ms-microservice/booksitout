package com.jinkyumpark.core.reading.dto;

import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.reading.ReadingSession;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ReadingSessionDto {
    private Integer readTime;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Integer startPage;
    private Integer endPage;

    private Long bookId;
    private Long appUserId;

    public ReadingSession toEntity() {
        return ReadingSession.builder()
                .book(new Book(bookId))
                .appUserId(appUserId)
                .readTime(readTime)
                .startTime(startTime)
                .endTime(endTime)
                .startPage(startPage)
                .endPage(endPage)
                .build();
    }
}
