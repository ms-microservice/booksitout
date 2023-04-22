package com.jinkyumpark.gateway.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class JwtException {

    private final Integer status;
    private final String message;

}