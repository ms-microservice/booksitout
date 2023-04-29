package com.jinkyumpark.user.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
public class LoginSuccessResponse {
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:MM")
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final Integer status = 200;

    private final String message;
    private final String token;
    private final String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private final LocalDateTime registerDate;
    private final String profileImage;
    private final LoginMethod loginMethod;

    @Builder
    public LoginSuccessResponse(String message, String token, String name, LocalDateTime registerDate, String profileImage, LoginMethod loginMethod) {
        this.message = message;
        this.token = token;
        this.name = name;
        this.registerDate = registerDate;
        this.profileImage = profileImage;
        this.loginMethod = loginMethod;
    }
}
