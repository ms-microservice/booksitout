package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.gathering.GatheringLocationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class GatheringLocationTypeResponse {

    private GatheringLocationType type;
    private String description;

}