package com.jinkyumpark.user.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor @Builder
public class LoginSuccessResponse {

    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:MM")
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final Integer status = 200;
    private final String message;

    private final Long appUserId;
    private final String token;
    private final String name;
    private final String profileImage;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private final LocalDateTime registerDate;

    private final LoginMethod loginMethod;

}
