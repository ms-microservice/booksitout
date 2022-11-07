package com.jinkyumpark.bookitout.user.request;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class JoinRequest {
    @NotNull
    @NotBlank(message = "이메일을 입력해 주세요")
    @Email
    private String email;

    @NotNull
    @NotBlank(message = "비밃번호를 입력해 주세요")
    private String password;
}