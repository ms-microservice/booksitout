package com.jinkyumpark.core.statistics.response;

import com.jinkyumpark.core.statistics.dto.DayStatistics;
import com.jinkyumpark.core.statistics.dto.YearStatistics;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SummaryStatistics {
    private Integer status;

    private Integer year;

    private YearStatistics yearStatistics;
    private DayStatistics dayStatistics;
}