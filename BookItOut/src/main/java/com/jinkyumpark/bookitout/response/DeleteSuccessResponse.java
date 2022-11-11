package com.jinkyumpark.bookitout.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@ResponseStatus(HttpStatus.OK)
public class DeleteSuccessResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private String message = "요청하신 리소스를 삭제했어요";
    private final Integer status = HttpStatus.OK.value();
    private String path;

    public DeleteSuccessResponse(String path) {
        this.path = path;
    }

    public DeleteSuccessResponse(String path, String message) {
        this.message = message;
        this.path = path;
    }
}
