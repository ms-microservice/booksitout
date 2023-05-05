package com.jinkyumpark.forum.tips;

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

@EntityListeners(AuditingEntityListener.class)
@Entity @Table
public class Tips {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipsId;

    private String title;

    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;

    private String summary;

    @Enumerated(value = EnumType.STRING)
    private TipsType type;

    private Integer estimatedReadTime;

    @CreatedDate
    private LocalDate createdDate;
    @LastModifiedDate
    private LocalDate lastModifiedDate;

}