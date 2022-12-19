package com.jinkyumpark.bookitout.security.filters;

import com.google.common.base.Strings;
import com.jinkyumpark.bookitout.app.user.AppUserAuthenticationToken;
import com.jinkyumpark.bookitout.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final SecretKey secretKey;
    private final JwtConfig jwtConfig;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());

        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
//            if (!request.getRequestURI().contains("join")) {
//                response.setCharacterEncoding("UTF-8");
//                response.setContentType("application/json");
//                response.setStatus(HttpStatus.FORBIDDEN.value());
//
//                Map<String, String> responseMessage = Map.of("timestamp", new Date().toString(), "message", "로그인 해 주세요");
//                ObjectMapper mapper = new ObjectMapper();
//                response.getWriter().write(mapper.writeValueAsString(responseMessage));
//                response.getWriter().flush();
//                return;
//            }

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.replace(jwtConfig.getTokenPrefix(), "");

        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);

            Claims body = claimsJws.getBody();
            String username = body.getSubject();
            List<Map<String, String>> authorities = (List<Map<String, String>>) body.get("authorities");
            Long appUserId = Long.valueOf((Integer) body.get("appUserId"));

            Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                    .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                    .collect(Collectors.toSet());
            Authentication authentication = new AppUserAuthenticationToken(username, null, simpleGrantedAuthorities, appUserId);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (JwtException e) {
            throw new IllegalStateException("Token is not valid");
        }

        filterChain.doFilter(request, response);
    }
}
