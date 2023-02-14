package com.jinkyumpark.core.common.info;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class InfoResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String message;

    @Builder
    public InfoResponse(String message) {
        this.message = message;
    }
}
