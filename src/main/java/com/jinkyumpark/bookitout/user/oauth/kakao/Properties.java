package com.jinkyumpark.bookitout.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Properties {
    private String nickname;
    @JsonProperty("profile_image")
    private String profileImage;
    @JsonProperty("thumbnail_image")
    private String thumbnailImage;
}
