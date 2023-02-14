package com.jinkyumpark.core.user.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginFailResponse {
    private Integer status;
    private String message;
    private String cause;
}
