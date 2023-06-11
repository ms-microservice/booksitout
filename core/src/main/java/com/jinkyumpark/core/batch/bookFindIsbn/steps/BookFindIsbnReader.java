package com.jinkyumpark.core.batch.bookFindIsbn.steps;

import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.book.model.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import java.util.Map;

@RequiredArgsConstructor
@Configuration
public class BookFindIsbnReader {

    private final BookRepository bookRepository;

    @Bean
    public RepositoryItemReader<Book> bookFindIsbnRepositoryReader() {
        return new RepositoryItemReaderBuilder<Book>()
                .repository(bookRepository)
                .methodName("findAllBooksOfEmptyIsbn")
                .pageSize(5)
                .sorts(Map.of("id", Sort.Direction.ASC))
                .name("bookFindIsbnRepositoryReader")
                .build();
    }

}