package com.jinkyumpark.core.reading.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.CONFLICT)
public class ReadingSessionIsInProgressException extends RuntimeException {
    private final Integer status = HttpStatus.CONTINUE.value();
    private final String message = "아직 진행중이신 독서활동이 있어요. 전의 독서활동을 먼저 끝내 주세요";
    private final Long bookId;

    public ReadingSessionIsInProgressException(Long bookId) {
        this.bookId = bookId;
    }
}
