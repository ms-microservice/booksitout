package com.jinkyumpark.statistics;

import com.jinkyumpark.book.model.Book;
import com.jinkyumpark.book.model.QBook;
import com.jinkyumpark.reading.QReadingSession;
import com.jinkyumpark.reading.ReadingSession;
import com.jinkyumpark.statistics.dto.BookRelatedStatistics;
import com.jinkyumpark.statistics.dto.ReadingSessionRelatedStatistics;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class StatisticsQueryDslService {

    private final JPAQueryFactory queryFactory;

    public ReadingSessionRelatedStatistics getYearlyReadingSessionRelatedStatistics(Long appUserId, Integer year) {
        QReadingSession readingSession = QReadingSession.readingSession;

        List<ReadingSession> readingSessionList = queryFactory
                .selectFrom(readingSession)
                .where(readingSession.appUser.appUserId.eq(appUserId))
                .where(readingSession.startTime.year().eq(year))
                .fetch();

        int totalReadTime = readingSessionList
                .stream()
                .filter(r -> r.getReadTime() != null)
                .mapToInt(ReadingSession::getReadTime)
                .sum();

        int totalReadPage = readingSessionList
                .stream()
                .filter(r -> r.getEndPage() != null && r.getStartPage() != null)
                .mapToInt(r -> r.getEndPage() - r.getStartPage() + 1)
                .sum();

        int averageReadTime = totalReadTime / getDayPassed(year);

        int mostReadTime = (int) readingSessionList.stream()
                .filter(r -> r.getStartTime() != null && r.getEndTime() != null)
                .mapToLong(r -> Duration.between(r.getStartTime(), r.getEndTime()).toMinutes())
                .max()
                .orElse(0L);

        return ReadingSessionRelatedStatistics.builder()
                .totalReadTime(totalReadTime)
                .totalReadPage(totalReadPage)
                .mostReadTime(mostReadTime)
                .averageReadTime(averageReadTime)
                .build();
    }

    private int getDayPassed(int year) {
        LocalDate today = LocalDate.now();
        if (today.getYear() != year) return 365;

        return today.getDayOfYear();
    }

    public BookRelatedStatistics getYearlyBookRelatedStatistics(Long appUserId, Integer year) {
        QBook book = QBook.book;
        QReadingSession readingSession = QReadingSession.readingSession;

        List<Book> bookList = queryFactory
                .selectFrom(book)
                .join(book.readingSessionList, readingSession)
                // only fetch user's book
                .where(book.appUser.appUserId.eq(appUserId))
                // only fetch finished book
                .where(book.currentPage.eq(book.endPage))
                // only fetch finished in provided year
//                .where(readingSession.startTime.year().eq(year))
                .where(readingSession.startTime.eq(
                        JPAExpressions.select(readingSession.startTime.max())
                                .from(readingSession)
                                .where(readingSession.book.eq(book))
                ))
                .fetch();

        long ratedBookCount = bookList.stream()
                .filter(b -> b.getRating() != null)
                .count();
        int ratingSum = bookList.stream()
                .map(Book::getRating)
                .filter(Objects::nonNull)
                .reduce(Integer::sum)
                .orElse(0);
        double averageRating = (double) ratingSum / ratedBookCount;

        Integer totalReadBookCount = bookList.size();

        return BookRelatedStatistics.builder()
                .averageRating(averageRating)
                .totalReadBookCount(totalReadBookCount)
                .build();
    }
}
