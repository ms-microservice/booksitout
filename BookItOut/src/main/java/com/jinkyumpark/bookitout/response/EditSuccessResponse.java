package com.jinkyumpark.bookitout.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@Getter
@ResponseStatus(HttpStatus.OK)
public class EditSuccessResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final Integer status = HttpStatus.OK.value();
    private String message;
    private String path;

    public EditSuccessResponse(String path) {
        this.path = path;
        this.message = "성공적으로 수정했어요";
    }

    public EditSuccessResponse(String path, String message) {
        this.message = message;
        this.path = path;
    }
}
