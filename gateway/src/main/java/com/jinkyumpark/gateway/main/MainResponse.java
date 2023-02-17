package com.jinkyumpark.gateway.main;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MainResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String message;
    private final String redirectUrl;

    @Builder
    public MainResponse(String message, String redirectUrl) {
        this.message = message;
        this.redirectUrl = redirectUrl;
    }
}
