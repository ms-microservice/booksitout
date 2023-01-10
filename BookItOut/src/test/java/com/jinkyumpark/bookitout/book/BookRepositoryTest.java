package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.app.book.BookRepository;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.book.model.BookCategory;
import com.jinkyumpark.bookitout.app.book.model.BookLanguage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest(properties = {"spring.jpa.properties.javax.persistence.validation.mode=none"})
public class BookRepositoryTest {

    @Autowired
    private BookRepository underTest;

    @Test
    void itShouldUpdateLastModifiedDate() {
        // Given
        Book book = Book.builder()
                .bookId(1L)
                .author("author")
                .title("")
                .endPage(100)
                .language(BookLanguage.KOREAN)
                .category(BookCategory.ART)
                .build();
        underTest.save(book);

        // When
        // Then
    }
}
