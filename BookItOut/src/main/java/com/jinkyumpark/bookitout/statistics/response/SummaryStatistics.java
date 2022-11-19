package com.jinkyumpark.bookitout.statistics.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SummaryStatistics {
    private Integer status;

    private Integer year;

    private Yearly yearly;
    private Daily daily;

    private Integer goal;
}