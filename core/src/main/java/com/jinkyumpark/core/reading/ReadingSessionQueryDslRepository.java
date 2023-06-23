package com.jinkyumpark.core.reading;

import com.jinkyumpark.core.book.model.book.QBook;
import com.jinkyumpark.core.reading.dto.ReadingSessionDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ReadingSessionQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public ReadingSessionDto getCurrentReadingSession(Long appUserId) {
        QReadingSession readingSession = QReadingSession.readingSession;
        QBook book = QBook.book;

        ReadingSession currentReadingSession = queryFactory
                .selectFrom(readingSession)

                .innerJoin(book)
                .on(readingSession.book.bookId.eq(book.bookId))

                .where(readingSession.appUserId.eq(appUserId)
                        .and(readingSession.endTime.isNull())
                )

                .fetchOne();

        if (currentReadingSession == null) {
            return null;
        }

        return ReadingSessionDto.builder()
                .readingSessionId(currentReadingSession.getReadingSessionId())
                .readTime(currentReadingSession.getReadTime())
                .startTime(currentReadingSession.getStartTime())
                .endTime(currentReadingSession.getEndTime())
                .startPage(currentReadingSession.getStartPage())
                .endPage(currentReadingSession.getEndPage())
                .bookId(currentReadingSession.getBook().getBookId())
                .appUserId(currentReadingSession.getAppUserId())
                .build();
    }

}
