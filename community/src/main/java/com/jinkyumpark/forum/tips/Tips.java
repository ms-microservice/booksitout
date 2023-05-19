package com.jinkyumpark.forum.tips;

import com.jinkyumpark.forum.config.jpa.TimeEntity;
import com.jinkyumpark.forum.tips.dto.TipsDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;


@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class Tips extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipsId;

    private String title;

    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;

    private String summary;

    @Enumerated(value = EnumType.STRING)
    private TipsType type;

    private Integer estimatedReadTime;

    public Tips editTips(TipsDto tipsDto) {
        if (tipsDto.getTitle() != null) title = tipsDto.getTitle();
        if (tipsDto.getContent() != null) content = tipsDto.getContent();
        if (tipsDto.getSummary() != null) summary = tipsDto.getSummary();
        if (tipsDto.getEstimatedReadTime() != null) estimatedReadTime = tipsDto.getEstimatedReadTime();

        return this;
    }

}