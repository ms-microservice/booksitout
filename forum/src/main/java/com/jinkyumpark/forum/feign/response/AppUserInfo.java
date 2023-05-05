package com.jinkyumpark.forum.feign.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class AppUserInfo {

    private Long appUserId;
    private String email;
    private String name;
    private String profileImage;

}