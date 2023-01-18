package com.jinkyumpark.bookitout.book.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.memo.Memo;
import com.jinkyumpark.bookitout.quotation.Quotation;
import com.jinkyumpark.bookitout.reading.ReadingSession;
import com.jinkyumpark.bookitout.book.request.BookEditRequest;
import com.jinkyumpark.bookitout.reading.dto.ReadingSessionDto;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@DynamicInsert
@EntityListeners(AuditingEntityListener.class)

@Entity @Table(name = "book")
public class Book {
    @Id
    @SequenceGenerator(name = "book_seq", sequenceName = "book_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_seq")
    @Column(name = "book_id", updatable = false)
    private Long bookId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "cover", length = 1000)
    private String cover;

    @Column(name = "published_at")
    @JsonIgnore
    private LocalDateTime publishedAt;

    @Column(name = "add_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonIgnore
    private LocalDateTime addDate;

    @Column(name = "summary")
    private String summary;

    @Column(name = "currentPage")
    @ColumnDefault("0")
    private Integer currentPage;

    @Column(name = "endPage", nullable = false)
    private Integer endPage;

    @Column(name = "source")
    @Enumerated(EnumType.ORDINAL)
    private BookSource source;

    @Column(name = "form")
    @Enumerated(EnumType.ORDINAL)
    private BookForm form;

    @Column(name = "review")
    private String review;

    @Column(name = "rating", length = 5)
    private Integer rating;

    @Column(name = "sharing")
    @ColumnDefault("false")
    private Boolean isSharing;

    @Column(name = "language", nullable = false)
    @ColumnDefault(value = "1")
    @Enumerated(value = EnumType.ORDINAL)
    private BookLanguage language;

    @Column(name = "category", nullable = false)
    @ColumnDefault(value = "1")
    @Enumerated(value = EnumType.ORDINAL)
    private BookCategory category;

    @JsonIgnore
    @Column(name = "last_modified")
    @LastModifiedDate
    private LocalDateTime lastModified;

    // TODO : change to FK
    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "isGiveUp")
    @Convert(converter = BooleanTo01Converter.class)
    private Boolean isGiveUp;

    @ManyToOne
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", foreignKey = @ForeignKey(name = "book_user_fk"))
    @JsonIgnore
    private AppUser appUser;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnore
    private List<Memo> memoList;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnore
    private List<Quotation> quotationList;

    @OneToMany(targetEntity = ReadingSession.class, mappedBy = "book", fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<ReadingSession> readingSessionList;

    public Book(Long bookId) {
        this.bookId = bookId;
    }

    public void addReadingSession(ReadingSessionDto readingSessionDto) {
        if (readingSessionDto.getEndPage() != null) this.currentPage = readingSessionDto.getEndPage();
    }

    public void deleteReadingSession(ReadingSession readingSession) {
        if (readingSession.getEndPage() != null) this.currentPage = readingSession.getStartPage() == 0 ? 0 : readingSession.getStartPage() - 1;
    }

    public void updateReadingSession(ReadingSessionDto readingSession) {
        if (readingSession.getEndPage() != null) this.currentPage = readingSession.getEndPage();
    }

    public void giveUpBook() {
        this.isGiveUp = true;
    }

    public void unGiveUpBook() {
        this.isGiveUp = false;
    }

    public void editBook(BookEditRequest bookEditRequest) {
        if (bookEditRequest.getTitle() != null)
            this.title = bookEditRequest.getTitle();
        if (bookEditRequest.getLanguage() != null)
            this.language = BookLanguage.valueOf(bookEditRequest.getLanguage());
        if (bookEditRequest.getCover() != null)
            this.cover = bookEditRequest.getCover();
        if (bookEditRequest.getSummary() != null)
            this.cover = bookEditRequest.getCover();
        if (bookEditRequest.getSource() != null)
            this.source = BookSource.valueOf(bookEditRequest.getSource());
        if (bookEditRequest.getReview() != null)
            this.review = bookEditRequest.getReview();
        if (bookEditRequest.getIsSharing() != null)
            this.isSharing = bookEditRequest.getIsSharing();
        if (bookEditRequest.getEndPage() != null)
            this.endPage = bookEditRequest.getEndPage();
        if (bookEditRequest.getRating() != null)
            this.rating = bookEditRequest.getRating();
    }
}