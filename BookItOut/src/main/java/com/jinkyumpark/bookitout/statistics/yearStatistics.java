package com.jinkyumpark.bookitout.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class yearStatistics {
    private Integer totalReadTime;
    private Integer totalBookRead;
    private Integer totalReadPage;

    private Double averageReadTime;
    private Double averageStar;

    private Integer maxReadTime;
}
