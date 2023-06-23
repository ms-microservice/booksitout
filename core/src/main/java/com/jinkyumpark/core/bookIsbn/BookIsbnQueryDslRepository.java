package com.jinkyumpark.core.bookIsbn;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookIsbnQueryDslRepository {

    private final JPAQueryFactory queryFactory;

    public List<BookIsbn> getBookIsbnByQuery(String query, Pageable pageable) {
        QBookIsbn bookIsbn = QBookIsbn.bookIsbn;

        return queryFactory
                .selectFrom(bookIsbn)
                .where(
                        bookIsbn.title.contains(query).or(
                                bookIsbn.author.contains(query).or(
                                        bookIsbn.isbn.contains(query)
                                )
                        )
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

}
