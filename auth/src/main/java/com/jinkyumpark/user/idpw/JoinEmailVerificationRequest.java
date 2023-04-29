package com.jinkyumpark.user.idpw;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class JoinEmailVerificationRequest {

    @Email
    public String email;

}
