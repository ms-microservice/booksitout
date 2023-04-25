package com.jinkyumpark.gateway.security;

import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@RequiredArgsConstructor
@Configuration
public class JwtSecretKeyConfig {

    @Value("${jwt.secret}")
    private String secretKey;

    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

}
