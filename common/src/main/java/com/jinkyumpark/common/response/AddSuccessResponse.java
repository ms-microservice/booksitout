package com.jinkyumpark.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDate;

@Getter
@AllArgsConstructor @Builder

@ResponseStatus(HttpStatus.CREATED)
public class AddSuccessResponse {

    @DateTimeFormat(pattern = "yyyy-MM-ddThh:mm:ss")
    private final LocalDate timestamp = LocalDate.now();
    private final int status = HttpStatus.CREATED.value();
    private final String message;
    private final Long id;

    private final Object added;

}