package com.jinkyumpark.core.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class KakaoAccount {
    private Profile profile;
    @JsonProperty("has_email")
    private Boolean hasEmail;
    private String email;
}
