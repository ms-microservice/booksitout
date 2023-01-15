package com.jinkyumpark.bookitout.exception.core;

import com.jinkyumpark.bookitout.exception.http.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = {BookNotSharingException.class, NotAuthorizeException.class})
    public ResponseEntity<Map<String, Object>> handleException(BookNotSharingException e, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        Integer statusCode = HttpStatus.UNAUTHORIZED.value();

        Map<String, Object> responseMap = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", statusCode,
                "error", httpStatus.getReasonPhrase(),
                "message", e.getMessage(),
                "path", String.format("%s %s", request.getMethod(), request.getRequestURI())
        );

        return new ResponseEntity<>(responseMap, httpStatus);
    }
}
