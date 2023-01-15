package com.jinkyumpark.bookitout.user.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class ChangeNameRequest {

    @NotNull
    @NotBlank
    private String name;
}