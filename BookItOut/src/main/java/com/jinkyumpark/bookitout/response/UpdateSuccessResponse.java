package com.jinkyumpark.bookitout.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.ACCEPTED)
public class UpdateSuccessResponse extends RuntimeException {
    public UpdateSuccessResponse(String message) {
        super(message);
    }

    public UpdateSuccessResponse() {
        super("업데이트 했어요");
    }
}
