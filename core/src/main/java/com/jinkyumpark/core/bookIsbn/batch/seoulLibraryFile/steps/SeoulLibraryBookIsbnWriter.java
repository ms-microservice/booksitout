package com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile.steps;

import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@RequiredArgsConstructor
@Configuration
public class SeoulLibraryBookIsbnWriter {

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public ItemWriter<BookIsbn> bookIsbnWriter() {
        return items -> {
            JpaItemWriter<BookIsbn> writer = new JpaItemWriter<>();
            writer.setEntityManagerFactory(entityManagerFactory);

            writer.write(items);
        };
    }

}
