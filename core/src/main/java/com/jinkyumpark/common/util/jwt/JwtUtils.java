package com.jinkyumpark.common.util.jwt;

import com.jinkyumpark.common.config.JwtConfig;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtUtils {
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;

    public String generateAccessToken(String name,
                                       Long appUserId,
                                       Collection<? extends GrantedAuthority> authorities,
                                       boolean stayLogin) {

        String token = Jwts.builder()
                .setSubject(name)
                .claim("appUserId", appUserId)
                .claim("authorities", authorities)
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(
                        stayLogin ? jwtConfig.getTokenExpirationAfterDaysStayLogin() : jwtConfig.getTokenExpirationAfterDays()
                )))
                .signWith(secretKey)
                .compact();

        return token;
    }
}
