package com.jinkyumpark.core.statistics.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DayStatistics {
    private final Integer averageReadTime;
    private final Integer mostReadTime;
}