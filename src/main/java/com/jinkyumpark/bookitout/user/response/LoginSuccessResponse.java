package com.jinkyumpark.bookitout.user.response;

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

    @Builder
    public LoginSuccessResponse(String message, String token, String name, LocalDateTime registerDate, String profileImage) {
        this.message = message;
        this.token = token;
        this.name = name;
        this.registerDate = registerDate;
        this.profileImage = profileImage;
    }
}
