package com.jinkyumpark.core.reading.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@NoArgsConstructor @AllArgsConstructor @Builder
@Getter
public class ReadingAddRequest {
    @NotNull
    private LocalDate startDate;

    @NotNull
    private Integer startPage;

    @NotNull
    private Integer endPage;

    @NotNull
    private Integer readTime;
}