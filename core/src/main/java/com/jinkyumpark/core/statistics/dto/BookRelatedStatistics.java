package com.jinkyumpark.core.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class BookRelatedStatistics {

    private final double averageRating;
    private final int totalReadBookCount;

}
