package com.jinkyumpark.bookitout.exception.http;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotAuthorizeException extends RuntimeException {
    public NotAuthorizeException() { super("해당 동작을 수행할 권한이 없어요"); }
    public NotAuthorizeException(String message) { super(message); }
}