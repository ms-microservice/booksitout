package com.jinkyumpark.statistics;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StatisticsDto {
    private Integer totalReadMinute;
    private Integer totalStar;
    private Integer maxReadMinute;
    private Integer totalPage;
    private Boolean bookFinished;
}
