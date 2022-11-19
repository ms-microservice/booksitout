package com.jinkyumpark.bookitout.statistics.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Yearly {
    private Integer totalReadTime;
    private Integer totalReadBookCount;
    private Double averageStar;
    private Integer totalReadPage;
}