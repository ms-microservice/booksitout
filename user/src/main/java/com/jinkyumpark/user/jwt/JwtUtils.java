package com.jinkyumpark.user.jwt;

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

        Date expirationDate = java.sql.Date.valueOf(LocalDate.now().plusDays(
                        stayLogin ? jwtConfig.getTokenExpirationAfterDaysStayLogin() : jwtConfig.getTokenExpirationAfterDays()
                )
        );

        return Jwts.builder()
                .setSubject(name)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)

                .claim("appUserId", appUserId)
                .claim("authorities", authorities)

                .signWith(secretKey)

                .compact();
    }

}
