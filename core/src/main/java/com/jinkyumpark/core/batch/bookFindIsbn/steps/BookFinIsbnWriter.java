package com.jinkyumpark.core.batch.bookFindIsbn.steps;

import com.jinkyumpark.core.book.model.book.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@RequiredArgsConstructor
@Configuration
public class BookFinIsbnWriter {

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public ItemWriter<Book> bookWriter() {
        return items -> {
            JpaItemWriter<Book> writer = new JpaItemWriter<>();
            writer.setEntityManagerFactory(entityManagerFactory);

            writer.write(items);
        };
    }

}
