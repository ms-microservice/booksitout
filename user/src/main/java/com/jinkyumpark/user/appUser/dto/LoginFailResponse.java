package com.jinkyumpark.user.appUser.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginFailResponse {
    
    private Integer status;
    private String message;
    private String cause;

}
