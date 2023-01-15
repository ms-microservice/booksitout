package com.jinkyumpark.bookitout.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class StatisticsEditRequest {
    private Integer totalReadMinute;
    private Integer totalStar;
    private Integer maxReadMinute;
    private Integer totalPage;

    private Boolean bookFinished;

}
