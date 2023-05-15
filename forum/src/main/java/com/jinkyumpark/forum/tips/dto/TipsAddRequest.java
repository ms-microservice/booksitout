package com.jinkyumpark.forum.tips.dto;

import com.jinkyumpark.forum.tips.Tips;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TipsAddRequest {

    @NotBlank private String title;
    @NotBlank private String content;
    private String summary;
    private int estimatedReadTime;

    public Tips toEntity() {
        return Tips.builder()
                .title(title)
                .content(content)
                .estimatedReadTime(estimatedReadTime)
                .build();
    }

}
