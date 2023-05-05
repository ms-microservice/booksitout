package com.jinkyumpark.forum.tips;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TipsDto {

    private Long id;
    private String title;
    private String content;
    private Integer estimatedReadTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastModifiedDate;

    public static TipsDto of(Tips tips) {
        return TipsDto.builder()
                .id(tips.getTipsId())
                .title(tips.getTitle())
                .content(tips.getContent())
                .estimatedReadTime(tips.getEstimatedReadTime())
                .createdDate(tips.getCreatedDate())
                .lastModifiedDate(tips.getLastModifiedDate())
                .build();
    }
}