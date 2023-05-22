package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.gathering.Gathering;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class GatheringDetailResponse {

    private Long id;

    private String title;
    private String content;

    private GatheringTypeResponse type;
    private GatheringLocationTypeResponse location;

    private AppUserInfo user;

    private int joinCount;
    private int capacityCount;

    public static GatheringDetailResponse of(Gathering gathering, AppUserInfo appUserInfo, int joinCount) {
        return GatheringDetailResponse.builder()
                .id(gathering.getGatheringId())
                .title(gathering.getTitle())
                .content(gathering.getContent())
                .type(new GatheringTypeResponse(gathering.getType(), gathering.getType().getDisplayName()))
                .location(new GatheringLocationTypeResponse(gathering.getLocationType(), gathering.getLocation()))
                .user(appUserInfo)
                .joinCount(joinCount)
                .capacityCount(gathering.getCapacity())
                .build();
    }

}
