package com.jinkyumpark.user.publicUser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PublicUserEditRequest {

    private String nickName;
    private String profileImage;

}
