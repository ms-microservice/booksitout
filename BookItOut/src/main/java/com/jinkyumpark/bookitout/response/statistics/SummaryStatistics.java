package com.jinkyumpark.bookitout.response.statistics;

import com.jinkyumpark.bookitout.model.statistics.DayStatistics;
import com.jinkyumpark.bookitout.model.statistics.YearStatistics;
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

    private Integer goal;
}