package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.repository.BookRepository;
import com.jinkyumpark.bookitout.repository.ReadingSessionRepository;
import com.jinkyumpark.bookitout.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;

public class BookServiceTest {
    @Mock
    private BookRepository bookRepository;
    @Mock
    private ReadingSessionRepository readingSessionRepository;

    @Autowired
    private MessageSourceAccessor messageSource;

    private BookService underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        underTest = new BookService(messageSource, bookRepository, readingSessionRepository);
    }

    @Test
    void itShouldName() {
        // Given
        // When
        // Then
    }
}
