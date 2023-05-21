package com.jinkyumpark.user.appUser.dto;

import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class ChangePasswordRequest {
    @NotNull
    @NotBlank
    @Length(min = 6)
    private String oldPassword;

    @NotNull
    @NotBlank
    @Length(min = 6)
    private String newPassword;

    @NotNull
    private Integer code;
}
