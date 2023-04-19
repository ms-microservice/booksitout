package com.jinkyumpark.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class ReadingSessionRelatedStatistics {

    private final Integer totalReadTime;
    private final Integer totalReadPage;
    private final Integer mostReadTime;
    private final Integer averageReadTime;

}
