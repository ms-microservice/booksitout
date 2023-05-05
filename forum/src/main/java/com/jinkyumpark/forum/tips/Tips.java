package com.jinkyumpark.forum.tips;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class Tips {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipsId;

    private String title;
    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;
    @Enumerated(value = EnumType.STRING)
    private TipsType type;

    private Integer estimatedReadTime;

    @CreatedDate
    private LocalDate createdDate;
    @LastModifiedDate
    private LocalDate lastModifiedDate;

}