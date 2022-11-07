package com.jinkyumpark.bookitout.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter

@ResponseBody
@ResponseStatus(HttpStatus.CREATED)
public class JoinResponse {
    private String message = "해당 이메일과 비밀번호로 가입됐어요";
    private LocalDateTime timestamp = LocalDateTime.now();
}
