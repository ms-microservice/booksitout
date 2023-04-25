package com.jinkyumpark.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginFailResponse {
    private Integer status;
    private String message;
    private String cause;
}
