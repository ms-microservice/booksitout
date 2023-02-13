package com.jinkyumpark.bookitout.statistics.response;

import com.jinkyumpark.bookitout.statistics.model.DayStatistics;
import com.jinkyumpark.bookitout.statistics.model.YearStatistics;
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