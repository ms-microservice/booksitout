package com.jinkyumpark.core.reading;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.reading.dto.ReadingSessionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Table
@Entity
public class ReadingSession {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readingSessionId;

    private Integer startPage;
    private Integer endPage;

    @Column(name = "start_time", updatable = false, nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endTime;

    private Integer readTime;

    private Long appUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", updatable = false, foreignKey = @ForeignKey(name = "reading_session_book_fk"))
    @JsonIgnore
    private Book book;

   public void updateReadingSession(ReadingSessionDto readingSessionDto) {
        if (readingSessionDto.getReadTime() != null) this.readTime = readingSessionDto.getReadTime();
        if (readingSessionDto.getStartTime() != null) this.startTime = readingSessionDto.getStartTime();
        if (readingSessionDto.getEndTime() != null) this.endTime = readingSessionDto.getEndTime();
        if (readingSessionDto.getStartPage() != null) this.startPage = readingSessionDto.getStartPage();
        if (readingSessionDto.getEndPage() != null) this.endPage = readingSessionDto.getEndPage();
   }
}