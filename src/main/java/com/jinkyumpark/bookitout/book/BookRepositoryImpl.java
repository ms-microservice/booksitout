package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.book.model.QBook;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class BookRepositoryImpl {
    private final JPAQueryFactory queryFactory;

    public List<Book> getAllBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUser.appUserId.eq(appUserId))
                .where(book.title.trim().containsIgnoreCase(query.replaceAll(" ", ""))
                        .or(book.author.contains(query)))
                .limit(10)
                .fetch();
    }

    public List<Book> getNotDoneBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUser.appUserId.eq(appUserId))
                .where(book.title.trim().containsIgnoreCase(query.replaceAll(" ", ""))
                                .or(book.author.contains(query)))
                .where(book.currentPage.gt(book.endPage))
                .limit(10)
                .fetch();
    }

    public List<Book> getDoneBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUser.appUserId.eq(appUserId))
                .where(book.title.trim().containsIgnoreCase(query.replaceAll(" ", ""))
                        .or(book.author.contains(query)))
                .where(book.currentPage.eq(book.endPage))
                .limit(10)
                .fetch();
    }

    public List<Book> getExcludeGiveUpBookByQuery(Long appUserId, String query) {
        QBook book = QBook.book;

        return queryFactory
                .selectFrom(book)
                .where(book.appUser.appUserId.eq(appUserId))
                .where(book.title.trim().containsIgnoreCase(query.replaceAll(" ", ""))
                        .or(book.author.contains(query)))
                .where(book.isGiveUp.eq(false))
                .limit(10)
                .fetch();
    }
}
