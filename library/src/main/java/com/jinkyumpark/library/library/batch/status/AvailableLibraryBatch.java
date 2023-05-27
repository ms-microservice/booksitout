package com.jinkyumpark.library.library.batch.status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class AvailableLibraryBatch {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Integer currentPage;
    private Integer totalPage;

    private Integer size;

    public AvailableLibraryBatch addPage() {
        this.currentPage++;
        return this;
    }

}