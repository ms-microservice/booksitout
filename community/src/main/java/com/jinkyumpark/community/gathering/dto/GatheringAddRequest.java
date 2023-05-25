package com.jinkyumpark.community.gathering.dto;

import com.jinkyumpark.community.gathering.Gathering;
import com.jinkyumpark.community.gathering.GatheringLocationType;
import com.jinkyumpark.community.gathering.GatheringType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class GatheringAddRequest {

    @NotBlank private String title;
    @NotBlank private String content;
    private String type;

    @NotBlank private String locationType;
    @NotBlank private String location;

    private Integer capacity;

    public Gathering toEntity(Long appUserId) {
        return Gathering.builder()
                .title(title)
                .content(content)
                .type(GatheringType.valueOf(type == null ? "ALL" : type.toUpperCase()))
                .locationType(GatheringLocationType.valueOf(locationType.toUpperCase()))
                .location(location)
                .appUserId(appUserId)
                .capacity(capacity == null ? 0 : capacity)
                .build();
    }

}
