package com.jinkyumpark.bookitout.reading.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ReadingEditRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer readTime;
    private Integer endPage;
}