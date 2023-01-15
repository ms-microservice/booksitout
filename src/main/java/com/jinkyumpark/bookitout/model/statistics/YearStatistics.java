package com.jinkyumpark.bookitout.model.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class YearStatistics {
    private Integer totalReadTime;
    private Integer totalReadBookCount;
    private Double averageStar;
    private Integer totalReadPage;
}