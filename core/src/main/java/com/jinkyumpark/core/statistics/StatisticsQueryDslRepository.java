package com.jinkyumpark.core.statistics;

import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.book.model.book.QBook;
import com.jinkyumpark.core.reading.QReadingSession;
import com.jinkyumpark.core.reading.ReadingSession;
import com.jinkyumpark.core.statistics.dto.BookRelatedStatistics;
import com.jinkyumpark.core.statistics.dto.ReadingSessionRelatedStatistics;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StatisticsQueryDslRepository {

    private final JPAQueryFactory queryFactory;

    public ReadingSessionRelatedStatistics getYearlyReadingSessionRelatedStatistics(Long appUserId, Integer year) {
        QReadingSession readingSession = QReadingSession.readingSession;

        List<ReadingSession> readingSessionList = queryFactory
                .selectFrom(readingSession)
                .where(readingSession.appUserId.eq(appUserId)
                                .and(readingSession.startTime.year().eq(year))
                )
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

                .innerJoin(book.readingSessionList, readingSession)

                .where(book.appUserId.eq(appUserId)
                                .and(book.currentPage.goe(book.endPage))
                                .and(readingSession.startTime.year().eq(year))
                                .and(readingSession.startTime.eq(
                                                queryFactory
                                                        .select(readingSession.startTime.max())
                                                        .from(readingSession)
                                                        .where(readingSession.book.eq(book))
                                        )
                                )
                )

                .groupBy(book, readingSession.startTime)

                .fetch();

        long ratedBookCount = bookList.stream()
                .filter(b -> b.getRating() != null)
                .count();
        int ratingSum = bookList.stream()
                .map(Book::getRating)
                .filter(Objects::nonNull)
                .reduce(Integer::sum)
                .orElse(0);
        double averageRating = (double) ratingSum / (double) (ratedBookCount == 0 ? 1 : ratedBookCount);

        int totalReadBookCount = bookList.size();

        return BookRelatedStatistics.builder()
                .averageRating(averageRating)
                .totalReadBookCount(totalReadBookCount)
                .build();
    }

    public Integer countConsecutiveReading(Long appUserId) {
        QReadingSession readingSession = QReadingSession.readingSession;

        List<LocalDate> readingTime = queryFactory
                .selectFrom(readingSession)
                .where(readingSession.appUserId.eq(appUserId))
                .orderBy(readingSession.startTime.desc())
                .fetch().stream()

                .map(r -> r.getStartTime().toLocalDate())
                .distinct()
                .collect(Collectors.toList());

        LocalDate previousDate = LocalDate.now().plusDays(1L);
        int count = 0;
        for (LocalDate currentDate : readingTime) {
            long difference = ChronoUnit.DAYS.between(currentDate, previousDate);
            if (difference > 1) {
                break;
            }

            count++;
            previousDate = currentDate;
        }

        return count;
    }

}
