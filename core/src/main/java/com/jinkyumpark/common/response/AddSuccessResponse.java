package com.jinkyumpark.common.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.CREATED)
public class AddSuccessResponse extends CrudResponse {
    private final Long id;

    @Builder
    public AddSuccessResponse(String message, Integer status, String path, Long id) {
        super(message == null ? "성공적으로 추가했어요!" : message,
                status == null ? HttpStatus.CREATED.value() : status,
                path);
        this.id = id;
    }
}
