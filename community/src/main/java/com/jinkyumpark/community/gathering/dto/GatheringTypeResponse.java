package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.gathering.GatheringType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class GatheringTypeResponse {

    private GatheringType type;
    private String displayName;

}