package com.jinkyumpark.community.gathering.join.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class GatheringJoinAddRequest {

    @NotBlank private String content;

}
