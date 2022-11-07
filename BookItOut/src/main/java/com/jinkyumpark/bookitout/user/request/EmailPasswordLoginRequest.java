package com.jinkyumpark.bookitout.user.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class EmailPasswordLoginRequest {
    private String email;
    private String password;
}
