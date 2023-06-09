package com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile;

import com.jinkyumpark.core.bookIsbn.BookIsbn;
import com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile.dto.FileSeoulLibraryResponse;
import com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile.steps.SeoulLibraryBookIsbnProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class SeoulLibraryBookIsbnBatchConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    private final ItemReader<FileSeoulLibraryResponse> reader;
    private final SeoulLibraryBookIsbnProcessor processor;
    private final ItemWriter<BookIsbn> writer;

    @Bean
    public Job fileSeoulLibraryBookIsbnJob() {
        return jobBuilderFactory
                .get("fileSeoulLibraryBookIsbnJob")
                .incrementer(new RunIdIncrementer())
                .flow(fileSeoulLibraryBookIsbnStep())
                .end()
                .build();
    }

    @Bean
    public Step fileSeoulLibraryBookIsbnStep() {
        return stepBuilderFactory
                .get("fileSeoulLibraryBookIsbnStep")
                .<FileSeoulLibraryResponse, BookIsbn>chunk(5)

                .reader(reader)
                .processor(processor)
                .writer(writer)

                .build();
    }

}
