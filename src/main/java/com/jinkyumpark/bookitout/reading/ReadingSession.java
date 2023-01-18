package com.jinkyumpark.bookitout.reading;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.reading.dto.ReadingSessionDto;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor

@DynamicUpdate
@DynamicInsert
@Entity @Table
public class ReadingSession {
    @Id
    @SequenceGenerator(name = "reading_session_seq", sequenceName = "reading_session_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reading_session_seq")
    @Column(name = "reading_session_id")
    private Long readingSessionId;

    private Integer startPage;
    private Integer endPage;

    @Column(name = "start_time", updatable = false, nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private Integer readTime;

    @Builder
    public ReadingSession(Integer startPage, Integer endPage, LocalDateTime startTime, LocalDateTime endTime, Integer readTime, AppUser appUser, Book book) {
        this.startPage = startPage;
        this.endPage = endPage;
        this.startTime = startTime;
        this.endTime = endTime;
        this.readTime = readTime;
        this.appUser = appUser;
        this.book = book;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "reading_session_app_user_fk"))
    @JsonIgnore
    private AppUser appUser;

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