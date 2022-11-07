package com.jinkyumpark.bookitout.user.request;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class JoinRequest {
    @NotNull
    @NotBlank(message = "이메일을 입력해 주세요")
    @Email
    private String email;

    @NotNull
    @NotBlank(message = "비밃번호를 입력해 주세요")
    @Min(value = 6, message = "6자 이상의 비밀번호를 입력해 주세요")
    private String password;
}