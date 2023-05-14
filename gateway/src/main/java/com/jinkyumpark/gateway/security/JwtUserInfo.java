package com.jinkyumpark.gateway.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class JwtUserInfo {
    private final String email;
    private final Long appUserId;
    private final String roles;
}