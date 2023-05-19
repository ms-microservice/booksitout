package com.jinkyumpark.user.appUser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class JoinSuccessResponse {

    private String message;
    private String path;

}
