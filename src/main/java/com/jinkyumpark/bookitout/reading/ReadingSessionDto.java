package com.jinkyumpark.bookitout.reading;

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
}
