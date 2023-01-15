package com.jinkyumpark.bookitout.model.statistics;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.model.ReadingSession;
import com.jinkyumpark.bookitout.request.BookEditRequest;
import com.jinkyumpark.bookitout.request.StatisticsEditRequest;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor

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

    public void addReadingSession(ReadingSession readingSession) {
        if (readingSession.getReadTime() != null) this.totalReadMinute += readingSession.getReadTime();
        if (readingSession.getEndPage() != null) this.totalPage += readingSession.getEndPage() - readingSession.getStartPage() + 1;
        if (readingSession.getEndPage() != null && readingSession.getEndPage().equals(readingSession.getBook().getEndPage())) this.finishedBook++;
        if (readingSession.getReadTime() != null && this.maxReadMinute < readingSession.getReadTime()) this.maxReadMinute = readingSession.getReadTime();
    }

    public void deleteReadingSession(ReadingSession readingSession, Book book) {
        if (readingSession.getEndPage() != null && readingSession.getEndPage().equals(book.getEndPage())) this.finishedBook--;
        if (readingSession.getReadTime() != null) this.totalReadMinute -= readingSession.getReadTime();
        if (readingSession.getEndPage() != null) this.totalPage -= readingSession.getEndPage() - readingSession.getStartPage();
    }

    public void updateReadingSession(ReadingSession previousReadingSession, ReadingSession updatedReadingSession, Book book) {
        if (previousReadingSession.getEndPage() == null && updatedReadingSession.getEndPage() != null) this.totalPage += updatedReadingSession.getEndPage() - updatedReadingSession.getStartPage();
        if (previousReadingSession.getEndPage() != null && updatedReadingSession.getEndPage() != null) {
            Integer previousPage = previousReadingSession.getEndPage() - previousReadingSession.getStartPage() + 1;
            Integer updatedPage = updatedReadingSession.getEndPage() - updatedReadingSession.getStartPage() + 1;
            this.totalPage = this.totalPage - previousPage + updatedPage;
        }
        if (updatedReadingSession.getReadTime() != null) this.totalReadMinute += updatedReadingSession.getReadTime() - (previousReadingSession.getReadTime() == null ? 0 : previousReadingSession.getReadTime());
        if (updatedReadingSession.getEndPage() != null && updatedReadingSession.getEndPage().equals(book.getEndPage())) this.finishedBook++;
        if (updatedReadingSession.getReadTime() != null && this.maxReadMinute < updatedReadingSession.getReadTime()) this.maxReadMinute = updatedReadingSession.getReadTime();
    }

    public void editBook(BookEditRequest bookEditRequest) {
        if (bookEditRequest.getRating() != null)
            this.totalStar += bookEditRequest.getRating();
    }

    public void editStatistics(StatisticsEditRequest statisticsEditRequest) {
        if (statisticsEditRequest.getTotalReadMinute() != null)
            this.totalReadMinute += statisticsEditRequest.getTotalReadMinute();
        if (statisticsEditRequest.getBookFinished())
            this.finishedBook += 1;
        if (statisticsEditRequest.getTotalStar() != null)
            this.totalStar += statisticsEditRequest.getTotalStar();
        if (statisticsEditRequest.getMaxReadMinute() != null)
            this.maxReadMinute = statisticsEditRequest.getMaxReadMinute();
        if (statisticsEditRequest.getTotalPage() != null)
            this.totalPage += statisticsEditRequest.getTotalPage();
    }
}