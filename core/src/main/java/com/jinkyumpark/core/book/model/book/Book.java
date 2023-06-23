package com.jinkyumpark.core.book.model.book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.core.book.model.customBook.BookCustom;
import com.jinkyumpark.core.book.dto.BookDto;
import com.jinkyumpark.core.bookIsbn.BookIsbn;
import com.jinkyumpark.core.common.jpa.TimeEntity;
import com.jinkyumpark.core.memo.Memo;
import com.jinkyumpark.core.reading.ReadingSession;
import com.jinkyumpark.core.reading.dto.ReadingSessionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@DynamicInsert
@Entity @Table(name = "book")
public class Book extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bookId;

    @ColumnDefault("0") private Integer currentPage;
    @Column(nullable = false) private Integer endPage;

    @Enumerated(EnumType.ORDINAL) private BookSource source;
    @Enumerated(EnumType.ORDINAL) private BookForm form;

    @Column(length = 5) private Integer rating;

    @ColumnDefault(value = "UNKNOWN")
    @Enumerated(value = EnumType.STRING)
    private BookLanguage language;

    @ColumnDefault("false") private Boolean isGiveUp;
    @ColumnDefault("true") private Boolean sharing;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("NONE")
    private BookMemoType memoType;

    private String memoLink;

    private Long appUserId;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnore
    private List<Memo> memoList;

    @OneToMany(targetEntity = ReadingSession.class, mappedBy = "book", fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<ReadingSession> readingSessionList;

    @OneToOne @JoinColumn(name = "book_custom_id")
    private BookCustom bookCustom;

    @OneToOne @JoinColumn(name = "isbn")
    private BookIsbn bookIsbn;

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

    public void editBook(BookDto bookDto) {
        if (bookDto.getLanguage() != null)
            this.language = bookDto.getLanguage();
        if (bookDto.getSource() != null)
            this.source = bookDto.getSource();
        if (bookDto.getSharing() != null)
            this.sharing = bookDto.getSharing();
        if (bookDto.getEndPage() != null)
            this.endPage = bookDto.getEndPage();
        if (bookDto.getRating() != null)
            this.rating = bookDto.getRating();
        if (bookDto.getMemoType() != null)
            this.memoType = bookDto.getMemoType();
        if (bookDto.getMemoLink() != null)
            this.memoLink = bookDto.getMemoLink();
    }

    public Book addIsbn(String isbn) {
        this.bookIsbn = BookIsbn.builder()
                .isbn(isbn)
                .build();

        return this;
    }

    public Book addBookCustom(BookCustom bookCustom) {
        if (bookCustom == null) return this;

        this.bookCustom = bookCustom;
        return this;
    }

}
