package com.jinkyumpark.user;

import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.appUser.AppUserService;
import com.jinkyumpark.user.dto.request.EmailPasswordLoginRequest;
import com.jinkyumpark.user.dto.response.LoginMethod;
import com.jinkyumpark.user.dto.response.LoginSuccessResponse;
import com.jinkyumpark.user.exception.http.NotFoundException;
import com.jinkyumpark.user.jwt.JwtUtils;
import com.jinkyumpark.user.settings.Settings;
import com.jinkyumpark.user.settings.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("user/v3")
public class AppUserControllerV3 {

    private final AppUserService appUserService;
    private final SettingsService settingsService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public LoginSuccessResponse login(@RequestBody EmailPasswordLoginRequest loginRequest) {
        AppUser appUser = appUserService.getUserByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException(""));
        if (appUser.getPassword() == null || !passwordEncoder.matches(loginRequest.getPassword(), appUser.getPassword())) {
            throw new IllegalStateException("");
        }

        String token = "Bearer " + jwtUtils.generateAccessToken(appUser.getName(), appUser.getAppUserId(), appUser.getAuthorities(), true);
        Settings settings = settingsService.getSettingsByAppUserId(appUser.getAppUserId());

        return LoginSuccessResponse.builder()
                .token(token)
                .name(appUser.getName())
                .registerDate(appUser.getCreatedDate())
                .profileImage(appUser.getProfileImage())
                .loginMethod(LoginMethod.MANUAL)
                .settings(settings)
                .build();
    }

}
