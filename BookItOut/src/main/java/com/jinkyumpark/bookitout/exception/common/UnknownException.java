package com.jinkyumpark.bookitout.exception.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class UnknownException extends RuntimeException {
    public UnknownException(String message) { super(message); }
}
