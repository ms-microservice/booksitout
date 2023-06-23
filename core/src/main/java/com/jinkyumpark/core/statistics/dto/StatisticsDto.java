package com.jinkyumpark.core.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class StatisticsDto {
    private Integer totalReadMinute;
    private Integer totalStar;
    private Integer maxReadMinute;
    private Integer totalPage;
    private Boolean bookFinished;
}
