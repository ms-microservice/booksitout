package com.jinkyumpark.bookitout.reading.dto;

import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.reading.ReadingSession;
import com.jinkyumpark.bookitout.user.AppUser;
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
                .appUser(new AppUser(appUserId))
                .readTime(readTime)
                .startTime(startTime)
                .endTime(endTime)
                .startPage(startPage)
                .endPage(endPage)
                .build();
    }
}
