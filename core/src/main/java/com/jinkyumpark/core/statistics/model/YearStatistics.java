package com.jinkyumpark.core.statistics.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class YearStatistics {
    private final Integer totalReadTime;
    private final Integer totalReadBookCount;
    private final Double averageStar;
    private final Integer totalReadPage;
}