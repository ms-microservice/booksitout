package com.jinkyumpark.core.common.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jinkyumpark.core.common.config.JwtConfig;
import com.jinkyumpark.core.common.exception.http.NotLoginException;
import com.jinkyumpark.core.settings.SettingsService;
import com.jinkyumpark.core.user.AppUser;
import com.jinkyumpark.core.common.security.token.AppUserAuthenticationToken;
import com.jinkyumpark.core.user.request.EmailPasswordLoginRequest;
import com.jinkyumpark.core.common.util.jwt.JwtUtils;
import com.jinkyumpark.core.user.response.LoginFailResponse;
import com.jinkyumpark.core.user.response.LoginMethod;
import com.jinkyumpark.core.user.response.LoginSuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@RequiredArgsConstructor
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final JwtUtils jwtUtils;
    private final ObjectMapper objectMapper;

    private final SettingsService settingsService;

    private static Boolean stayLogin = false;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            EmailPasswordLoginRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), EmailPasswordLoginRequest.class);

            Authentication authentication = new AppUserAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()
            );

            stayLogin = authenticationRequest.getStayLogin();

            return authenticationManager.authenticate(authentication);

        } catch (IOException e) {
            throw new NotLoginException("Email or Password Not Present");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException {
        Long appUserId = ((AppUser) authResult.getPrincipal()).getAppUserId();

        String token = jwtUtils.generateAccessToken(authResult.getName(),
                appUserId,
                authResult.getAuthorities(),
                stayLogin
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + token);

        String appUserName = ((AppUser) authResult.getPrincipal()).getName();
        LocalDateTime registerDate = ((AppUser) authResult.getPrincipal()).getCreatedDate();

        LoginSuccessResponse loginSuccessResponse = LoginSuccessResponse.builder()
                .message(String.format("어서오세요, %s님!", appUserName))
                .token(jwtConfig.getTokenPrefix() + token)
                .name(appUserName)
                .registerDate(registerDate)
                .loginMethod(LoginMethod.MANUAL)
                .settings(settingsService.getSettingsByAppUserId(appUserId))
                .build();

        response.getWriter().write(objectMapper.writeValueAsString(loginSuccessResponse));
        response.getWriter().flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException {
        response.setStatus(401);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        ObjectMapper mapper = new ObjectMapper();
        LoginFailResponse loginFailResponse = LoginFailResponse.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message("이메일이나 비밀번호가 틀렸어요. 다시 확인해 주세요")
                .cause(failed.getMessage())
                .build();

        response.getWriter().write(mapper.writeValueAsString(loginFailResponse));
        response.getWriter().flush();
    }
}
