package com.jinkyumpark.bookitout.statistics.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DayStatistics {
    private final Integer averageReadTime;
    private final Integer mostReadTime;
}