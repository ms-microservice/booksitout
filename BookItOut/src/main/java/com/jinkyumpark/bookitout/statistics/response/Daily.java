package com.jinkyumpark.bookitout.statistics.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Daily {
    private Integer averageReadTime;
    private Integer mostReadTime;
}