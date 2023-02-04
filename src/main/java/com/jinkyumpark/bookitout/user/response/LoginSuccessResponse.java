package com.jinkyumpark.bookitout.user.response;

import com.jinkyumpark.bookitout.settings.Settings;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LoginSuccessResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final Integer status = 200;

    private final String message;
    private final String token;
    private final String name;
    private final LocalDateTime registerDate;
    private final String profileImage;
    private final LoginMethod loginMethod;

    private final Settings settings;

    @Builder
    public LoginSuccessResponse(String message, String token, String name, LocalDateTime registerDate, String profileImage, LoginMethod loginMethod, Settings settings) {
        this.message = message;
        this.token = token;
        this.name = name;
        this.registerDate = registerDate;
        this.profileImage = profileImage;
        this.loginMethod = loginMethod;
        this.settings = settings;
    }
}
