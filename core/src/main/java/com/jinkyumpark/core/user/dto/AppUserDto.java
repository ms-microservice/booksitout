package com.jinkyumpark.core.user.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AppUserDto {
    private final String email;
    private final String password;
    private final String name;
    private final Integer emailVerificationCode;
}
