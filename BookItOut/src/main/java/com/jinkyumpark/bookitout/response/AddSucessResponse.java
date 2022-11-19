package com.jinkyumpark.bookitout.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@Getter
@ResponseStatus(HttpStatus.CREATED)
public class AddSucessResponse {
    private final String timestamp = LocalDateTime.now().toString();
    private final Integer status = HttpStatus.CREATED.value();
    private String message = "성공적으로 추가했어요!";

    public AddSucessResponse(String message) {
        this.message = message;
    }
}
