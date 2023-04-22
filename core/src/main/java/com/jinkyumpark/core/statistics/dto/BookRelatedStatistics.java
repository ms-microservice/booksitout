package com.jinkyumpark.core.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class BookRelatedStatistics {

    private final Double averageRating;
    private final Integer totalReadBookCount;

}
