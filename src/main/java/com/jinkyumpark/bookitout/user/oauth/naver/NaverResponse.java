package com.jinkyumpark.bookitout.user.oauth.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class NaverResponse {
    private final String id;
    private final String message;
    private final String email;
    private final String name;
    @JsonProperty("profile_image")
    private final String profileImage;
    private final String birthday;
}