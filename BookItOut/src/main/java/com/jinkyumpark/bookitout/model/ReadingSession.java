package com.jinkyumpark.bookitout.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table(name = "ReadingSession")
public class ReadingSession {
    @Id
    @SequenceGenerator(name = "reading_session_seq", sequenceName = "reading_session_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reading_session_seq")
    @Column(name = "reading_session_id")
    private Long readingSessionId;

    @Column(name = "start_page")
    private Integer startPage;

    @Column(name = "end_page")
    private Integer endPage;

    @Column(name = "start_time", updatable = false, nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "read_time")
    private Integer readTime;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "reading_session_app_user_fk"))
    @JsonIgnore
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", updatable = false, foreignKey = @ForeignKey(name = "reading_session_book_fk"))
    @JsonIgnore
    private Book book;

    public void updateReadingSession(ReadingSession readingSession) {
        if (readingSession.getEndPage() != null) this.endPage = readingSession.getEndPage();
        if (readingSession.getReadTime() != null) this.readTime = readingSession.getReadTime();
        if (readingSession.getEndTime() != null) this.endTime = readingSession.getEndTime();
    }
}