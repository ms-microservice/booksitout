package com.jinkyumpark.community.gathering.join.dto;

import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.gathering.dto.GatheringResponse;
import com.jinkyumpark.community.gathering.dto.GatheringUserResponse;
import com.jinkyumpark.community.gathering.join.GatheringJoin;
import com.jinkyumpark.community.gathering.join.GatheringJoinStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class GatheringJoinResponse {

    private Long id;
    private String content;
    private GatheringJoinStatus status;

    private GatheringResponse gathering;
    private GatheringUserResponse user;

    public static GatheringJoinResponse of(GatheringJoin gatheringJoin, GatheringResponse gatheringResponse, AppUserInfo appUserInfo) {
        return GatheringJoinResponse.builder()
                .id(gatheringJoin.getGatheringJoinId())
                .content(gatheringJoin.getContent())
                .status(gatheringJoin.getStatus())
                .gathering(gatheringResponse)
                .user(new GatheringUserResponse(appUserInfo.getAppUserId(), appUserInfo.getName(), appUserInfo.getProfileImage()))
                .build();
    }

}
