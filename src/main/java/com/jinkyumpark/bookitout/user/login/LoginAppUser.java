package com.jinkyumpark.bookitout.user.login;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginAppUser {
    private Long id;
    private String name;
}
