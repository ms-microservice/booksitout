package com.jinkyumpark.bookitout.user.oauth.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Profile {
    private String nickname;
    private String thumbnailImageUrl;
    private String profileImageUrl;
    private Boolean isDefaultImage;
}
