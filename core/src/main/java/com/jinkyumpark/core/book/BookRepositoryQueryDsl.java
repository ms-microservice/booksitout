package com.jinkyumpark.core.book;

import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.book.model.book.QBook;
import com.jinkyumpark.core.reading.QReadingSession;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Repository
public class BookRepositoryQueryDsl {

    private final JPAQueryFactory queryFactory;

    public List<Book> getAllBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUserId.eq(appUserId))

                .where(book.bookIsbn.title.trim().containsIgnoreCase(query.replaceAll("%20", ""))
                        .or(book.bookCustom.title.trim().containsIgnoreCase(query.replaceAll("%20", "")))
                )

                .where(book.bookIsbn.author.contains(query.replaceAll("%20", ""))
                        .or(book.bookCustom.author.contains(query.replaceAll("%20", "")))
                )
                .limit(10)
                .fetch();
    }

    public List<Book> getNotDoneBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUserId.eq(appUserId))

                .where(book.bookIsbn.title.trim().containsIgnoreCase(query.replaceAll("%20", ""))
                        .or(book.bookCustom.title.trim().containsIgnoreCase(query.replaceAll("%20", "")))
                )

                .where(book.bookIsbn.author.contains(query.replaceAll("%20", ""))
                        .or(book.bookCustom.author.contains(query.replaceAll("%20", "")))
                )

                .where(book.currentPage.lt(book.endPage))
                .limit(10)
                .fetch();
    }

    public List<Book> getDoneBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUserId.eq(appUserId))

                .where(book.bookIsbn.title.trim().containsIgnoreCase(query.replaceAll("%20", ""))
                        .or(book.bookCustom.title.trim().containsIgnoreCase(query.replaceAll("%20", "")))
                )

                .where(book.bookIsbn.author.contains(query.replaceAll("%20", ""))
                        .or(book.bookCustom.author.contains(query.replaceAll("%20", "")))
                )

                .where(book.currentPage.goe(book.endPage))
                .limit(10)
                .fetch();
    }

    public List<Book> getExcludeGiveUpBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUserId.eq(appUserId)
                        .and(book.bookIsbn.title.containsIgnoreCase(query.replaceAll("%20", ""))
                                .or(book.bookCustom.title.containsIgnoreCase(query.replaceAll("%20", "")))
                                .or(book.bookIsbn.author.contains(query.replaceAll("%20", "")))
                                .or(book.bookCustom.author.contains(query.replaceAll("%20", "")))
                        )

                        .and(book.isGiveUp.eq(false).or(
                                book.isGiveUp.isNull()
                        ))
                )
                .limit(10)
                .fetch();
    }

    public Page<Book> getDoneBookOrderByDoneDateDesc(Long appUserId, Integer page, Integer size) {
        QBook book = QBook.book;
        QReadingSession readingSession = QReadingSession.readingSession;

        long totalCount = queryFactory
                .select(book)
                .from(book)
                .where(book.appUserId.eq(appUserId)
                        .and(book.currentPage.goe(book.endPage))
                )
                .fetchCount();

        List<Book> bookList = queryFactory
                .select(book)
                .from(book)

                .where(book.appUserId.eq(appUserId)
                        .and(book.currentPage.goe(book.endPage))
                )

                .innerJoin(book.readingSessionList, readingSession)
                .groupBy(book)

                .orderBy(readingSession.startTime.max().desc())

                .offset(page * size)
                .limit(size)

                .fetch();

        return new PageImpl<>(bookList, PageRequest.of(page, size), totalCount);
    }

    public int getDoneBookCountByYear(Long appUserId, int year) {
        QBook book = QBook.book;
        QReadingSession readingSession = QReadingSession.readingSession;

        return (int) queryFactory
                .selectFrom(book)

                .innerJoin(book.readingSessionList, readingSession)

                .where(book.appUserId.eq(appUserId)
                        .and(book.currentPage.goe(book.endPage))
                        .and(queryFactory
                                .select(readingSession.startTime.max().year())
                                .from(readingSession)
                                .where(readingSession.book.bookId.eq(book.bookId))
                                .eq(year)
                        )
                )

                .groupBy(book)

                .fetchCount();
    }

    public List<Book> getDoneBookByYear(Long appUserId, int year, Pageable pageable) {
        QBook book = QBook.book;
        QReadingSession readingSession = QReadingSession.readingSession;

        return queryFactory
                .selectFrom(book)

                .innerJoin(book.readingSessionList, readingSession)

                .where(book.appUserId.eq(appUserId)
                        .and(book.currentPage.goe(book.endPage))
                        .and(queryFactory
                                .select(readingSession.startTime.max().year())
                                .from(readingSession)
                                .where(readingSession.book.bookId.eq(book.bookId))
                                .eq(year)
                        )
                )

                .groupBy(book)

                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchAll()
                .stream()
                .collect(Collectors.toList())
        ;
    }


}
