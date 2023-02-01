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
                .where(book.title.contains(query))
                .fetch();
    }
}
