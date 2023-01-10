package com.jinkyumpark.bookitout.model.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DayStatistics {
    private Integer averageReadTime;
    private Integer mostReadTime;
}