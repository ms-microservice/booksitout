package com.jinkyumpark.bookitout.request.reading;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Builder
@Getter @Setter
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