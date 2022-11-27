package com.jinkyumpark.bookitout.app.statistics.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Daily {
    private Integer averageReadTime;
    private Integer mostReadTime;
}