package com.jinkyumpark.community.tips.dto;

import com.jinkyumpark.community.tips.Tips;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TipsSimple {

    private Long id;
    private String title;
    private Integer estimatedReadTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastModifiedDate;

    public static TipsSimple of(Tips tips) {
        return TipsSimple.builder()
                .id(tips.getTipsId())
                .title(tips.getTitle())
                .estimatedReadTime(tips.getEstimatedReadTime())
                .createdDate(LocalDate.from(tips.getCreatedDate()))
                .lastModifiedDate(LocalDate.from(tips.getLastModifiedDate()))
                .build();
    }

}
