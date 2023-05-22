package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.gathering.Gathering;
import com.jinkyumpark.community.gathering.GatheringLocationType;
import com.jinkyumpark.community.gathering.GatheringType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class GatheringUpdateRequest {

    private String title;
    private String content;
    private String type;

    private String locationType;
    private String location;

    private Integer capacity;

    public Gathering toEntity(Long gatheringId) {
        return Gathering.builder()
                .gatheringId(gatheringId)
                .title(title)
                .content(content)
                .type(type == null ? null : GatheringType.valueOf(type.toUpperCase()))
                .locationType(locationType == null ? null : GatheringLocationType.valueOf(locationType.toUpperCase()))
                .location(location)
                .capacity(capacity)
                .build();
    }

}
