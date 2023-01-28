package com.jinkyumpark.bookitout.user.oauth.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Builder
@Getter
public class NaverResponse {
    private String id;
    private String message;
    private String email;
    private String name;
    @JsonProperty("profile_image")
    private String profileImage;
    private String birthday;
}