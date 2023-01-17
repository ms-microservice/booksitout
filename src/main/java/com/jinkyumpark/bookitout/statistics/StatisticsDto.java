package com.jinkyumpark.bookitout.statistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class StatisticsDto {
    private Integer totalReadMinute;
    private Integer totalStar;
    private Integer maxReadMinute;
    private Integer totalPage;

    private Boolean bookFinished;

}
