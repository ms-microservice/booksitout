package com.jinkyumpark.library.common.loginUser;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class User {
    private Long id;
    private String name;
}
