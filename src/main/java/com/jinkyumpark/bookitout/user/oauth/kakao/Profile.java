package com.jinkyumpark.bookitout.user.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Profile {
    private String nickname;
    @JsonProperty("thumbnail_image_url")
    private String thumbnailImageUrl;
    @JsonProperty("profile_image_url")
    private String profileImageUrl;
    @JsonProperty("is_default_image")
    private Boolean isDefaultImage;
}
