package com.jinkyumpark.gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.SecretKey;
import java.util.List;

@Component
public class JwtValidationFilter extends AbstractGatewayFilterFactory<JwtValidationFilter.Config> {

    private final SecretKey jwtSecretKey;
    public static class Config {}

    public JwtValidationFilter(SecretKey secretKey) {
        super(Config.class);
        this.jwtSecretKey = secretKey;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            List<String> headers = exchange.getRequest().getHeaders().get("Authorization");
            if (headers == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 정보가 없어요");
            }

            String token = headers.get(0);

            if (token == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 정보가 없어요");
            }

            if (!token.replaceAll("\"", "").startsWith("Bearer")) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 정보 타입이 일치하지 않아요");
            }

            try {
                Jws<Claims> claims = Jwts.parser()
                        .setSigningKey(jwtSecretKey)
                        .parseClaimsJws(token.replaceAll("\"", "").replaceAll(" ", "").substring(6));

                String roles = claims.getBody().get("roles") == null ? "ROLE_USER" : claims.getBody().get("roles").toString();

                JwtUserInfo jwtUserInfo = JwtUserInfo.builder()
                        .email(claims.getSignature())
                        .appUserId(Long.valueOf((Integer) claims.getBody().get("appUserId")))
                        .roles(roles)
                        .build();

                addAuthorizationHeaders(exchange.getRequest(), jwtUserInfo);
                return chain.filter(exchange);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 정보가 변조됐거나 유효기간이 지났어요. 다시 로그인해 주세요");
            }

        };
    }

    private void addAuthorizationHeaders(ServerHttpRequest request, JwtUserInfo userInfo) {
        request.mutate()
                .header("X-Authorization-Id", String.valueOf(userInfo.getAppUserId()))
                .header("X-Authorization-Roles", String.valueOf(userInfo.getRoles()))
                .build();
    }

}
