package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.gathering.Gathering;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class GatheringResponse {

    private Long id;
    private String title;
    private String content;

    private GatheringTypeResponse type;
    private GatheringUserResponse user;
    private GatheringLocationTypeResponse location;

    public static GatheringResponse of(Gathering gathering, AppUserInfo appUserInfo) {
        return GatheringResponse.builder()
                .id(gathering.getGatheringId())
                .title(gathering.getTitle())
                .content(gathering.getContent())
                .type(new GatheringTypeResponse(gathering.getType(), gathering.getType().getDisplayName()))
                .user(GatheringUserResponse.of(appUserInfo))
                .location(new GatheringLocationTypeResponse(gathering.getLocationType(), gathering.getLocation()))
                .build();
    }

}