package com.jinkyumpark.core.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class DayStatistics {
    private Integer averageReadTime;
    private Integer mostReadTime;
}