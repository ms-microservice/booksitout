package com.jinkyumpark.bookitout.reading;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor

@DynamicUpdate
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
        this.readTime = readingSessionDto.getReadTime();
        this.startTime = readingSessionDto.getStartTime();
        this.endTime = readingSessionDto.getEndTime();
        this.startPage = readingSessionDto.getStartPage();
        this.endPage = readingSessionDto.getEndPage();
   }
}