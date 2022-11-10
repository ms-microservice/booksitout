package com.jinkyumpark.bookitout.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.AppUserAuthenticationToken;
import com.jinkyumpark.bookitout.user.request.EmailPasswordLoginRequest;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

@AllArgsConstructor
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            EmailPasswordLoginRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), EmailPasswordLoginRequest.class);

            Authentication authentication = new AppUserAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()
            );

            return authenticationManager.authenticate(authentication);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String token = Jwts.builder()
                .setSubject(authResult.getName())
                .claim("appUserId", ((AppUser) authResult.getPrincipal()).getAppUserId())
                .claim("authorities", authResult.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(secretKey)
                .compact();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + token);
//        response.addCookie(new Cookie("Authorization", jwtConfig.getTokenPrefix() + token));
        Map<String, String> successMessage = Map.of("timestamp", new Date().toString(), "message", "로그인했어요");

        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(successMessage));
        response.getWriter().flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(401);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> messageMap = Map.of("timestamp", new Date().toString(), "message", "이메일이나 비밀번호가 틀렸어요. 다시 확인해 주세요.");
        response.getWriter().write(mapper.writeValueAsString(messageMap));
        response.getWriter().flush();
    }
}
