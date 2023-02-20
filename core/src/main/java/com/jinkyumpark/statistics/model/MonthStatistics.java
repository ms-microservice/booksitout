package com.jinkyumpark.statistics.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.book.dto.BookDto;
import com.jinkyumpark.book.model.Book;
import com.jinkyumpark.reading.ReadingSession;
import com.jinkyumpark.reading.dto.ReadingSessionDto;
import com.jinkyumpark.statistics.StatisticsDto;
import com.jinkyumpark.user.AppUser;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@DynamicUpdate
@DynamicInsert
@Entity(name = "month_statistics") @Table(name = "MonthStatistics")
public class MonthStatistics {
    @EmbeddedId
    private MonthStatisticsId monthStatisticsId;

    @JsonIgnore
    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "month_statistics_app_user_fk"))
    private AppUser appUser;

    @Column(name = "total_read_minute")
    private Integer totalReadMinute;

    @Column(name = "finished_book")
    private Integer finishedBook;

    @Column(name = "total_star")
    private Integer totalStar;

    @Column(name = "max_read_minute")
    private Integer maxReadMinute;

    @Column(name = "total_page")
    private Integer totalPage;

    public MonthStatistics(Integer year, Integer month, AppUser appUser) {
        monthStatisticsId = new MonthStatisticsId(appUser.getAppUserId(), year, month);
        this.totalReadMinute = 0;
        this.finishedBook = 0;
        this.totalStar = 0;
        this.maxReadMinute = 0;
        this.totalPage = 0;
        this.appUser = appUser;
    }

    public void addReadingSession(ReadingSessionDto readingSession, Book book) {
        if (readingSession.getReadTime() != null)
            this.totalReadMinute += readingSession.getReadTime();
        if (readingSession.getEndPage() != null)
            this.totalPage += readingSession.getEndPage() - readingSession.getStartPage() + 1;
        if (readingSession.getEndPage() != null && readingSession.getEndPage().equals(book.getEndPage()))
            this.finishedBook++;
        if (readingSession.getReadTime() != null && this.maxReadMinute < readingSession.getReadTime())
            this.maxReadMinute = readingSession.getReadTime();
    }

    public void deleteReadingSession(ReadingSession readingSession, Book book) {
        if (readingSession.getEndPage() != null && readingSession.getEndPage().equals(book.getEndPage()))
            this.finishedBook--;
        if (readingSession.getReadTime() != null)
            this.totalReadMinute -= readingSession.getReadTime();
        if (readingSession.getEndPage() != null)
            this.totalPage -= readingSession.getEndPage() - readingSession.getStartPage();
    }

    public void updateReadingSession(ReadingSession previousReadingSession, ReadingSessionDto updatedReadingSession, Book book) {
        if (previousReadingSession.getEndPage() == null && updatedReadingSession.getEndPage() != null)
            this.totalPage += updatedReadingSession.getEndPage() - previousReadingSession.getStartPage();
        if (previousReadingSession.getEndPage() != null && updatedReadingSession.getEndPage() != null && previousReadingSession.getStartPage() != null && updatedReadingSession.getStartPage() != null) {
            int previousPage = previousReadingSession.getEndPage() - previousReadingSession.getStartPage() + 1;
            int updatedPage = updatedReadingSession.getEndPage() - updatedReadingSession.getStartPage() + 1;
            this.totalPage = this.totalPage - previousPage + updatedPage;
        }

        if (updatedReadingSession.getReadTime() != null)
            this.totalReadMinute += updatedReadingSession.getReadTime() - (previousReadingSession.getReadTime() == null ? 0 : previousReadingSession.getReadTime());
        if (updatedReadingSession.getEndPage() != null && updatedReadingSession.getEndPage().equals(book.getEndPage()))
            this.finishedBook++;
        if (updatedReadingSession.getReadTime() != null && this.maxReadMinute < updatedReadingSession.getReadTime())
            this.maxReadMinute = updatedReadingSession.getReadTime();
    }

    public void editBook(BookDto bookDto) {
        if (bookDto.getRating() != null)
            this.totalStar += bookDto.getRating();
    }

    public void editStatistics(StatisticsDto statisticsDto) {
        if (statisticsDto.getTotalReadMinute() != null)
            this.totalReadMinute += statisticsDto.getTotalReadMinute();
        if (statisticsDto.getBookFinished())
            this.finishedBook += 1;
        if (statisticsDto.getTotalStar() != null)
            this.totalStar += statisticsDto.getTotalStar();
        if (statisticsDto.getMaxReadMinute() != null)
            this.maxReadMinute = statisticsDto.getMaxReadMinute();
        if (statisticsDto.getTotalPage() != null)
            this.totalPage += statisticsDto.getTotalPage();
    }

    public void deleteBook(Book book) {
        if (book.getCurrentPage().equals(book.getEndPage())) this.finishedBook--;
        if (book.getCurrentPage().equals(book.getEndPage()) && book.getRating() != null) this.totalStar -= book.getRating();
        this.totalPage -= book.getCurrentPage();
    }
}