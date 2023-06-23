package com.jinkyumpark.core.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class YearStatistics {
    private Integer totalReadTime;
    private Integer totalReadBookCount;
    private Double averageStar;
    private Integer totalReadPage;


}