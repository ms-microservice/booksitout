package com.jinkyumpark.bookitout.exception.core;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class JavaExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleException(IllegalStateException e, HttpServletRequest request) {
        HttpHeaders responseHeaders = new HttpHeaders();
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        Integer statusCode = HttpStatus.BAD_REQUEST.value();

        Map<String, Object> responseMap = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", statusCode,
                "error", httpStatus.getReasonPhrase(),
                "message", e.getMessage(),
                "path", String.format("%s %s", request.getMethod(), request.getRequestURI())
        );

        return new ResponseEntity<>(responseMap, responseHeaders, httpStatus);
    }

}
