package com.jinkyumpark.bookitout.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoAccount {
    private Profile profile;
    @JsonProperty("has_email")
    private Boolean hasEmail;
    private String email;
}
