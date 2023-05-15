package com.jinkyumpark.forum.config.security.loginUser;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class User {
    private Long id;
    private String name;
}
