package com.jinkyumpark.core.batch.bookFindIsbn;

import com.jinkyumpark.core.book.model.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class BookFindIsbnBatchConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    private final RepositoryItemReader<Book> reader;
    private final ItemProcessor<Book, Book> processor;
    private final ItemWriter<Book> writer;

    @Bean
    public Job bookFindIsbnJob() {
        return jobBuilderFactory
                .get("bookFindIsbnJob")
                .incrementer(new RunIdIncrementer())
                .flow(bookFindIsbnStep())
                .end()
                .build();
    }

    @Bean
    public Step bookFindIsbnStep() {
        return stepBuilderFactory
                .get("bookFindIsbnStep")
                .<Book, Book>chunk(5)

                .reader(reader)
                .processor(processor)
                .writer(writer)

                .build();
    }

}
