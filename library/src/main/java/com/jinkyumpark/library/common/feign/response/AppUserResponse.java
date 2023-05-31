package com.jinkyumpark.library.common.feign.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class AppUserResponse {

    private Long appUserId;
    private String name;
    private String profileImage;
    private String email;

}
