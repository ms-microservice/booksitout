package com.jinkyumpark.core.common.feign.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PublicUserResponse {

    private Long appUserId;
    private String email;
    private String name;
    private String profileImage;
    private Boolean isPaidUser;
    private Integer joinDayCount;

}
