package com.jinkyumpark.library.library.batch.availableLibrary;

import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse;
import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.library.batch.availableLibrary.steps.AvailableLibraryProcessor;
import com.jinkyumpark.library.library.batch.availableLibrary.steps.AvailableLibraryReader;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class AvailableLibraryBatchConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final AvailableLibraryListener listener;

    private final AvailableLibraryReader reader;
    private final AvailableLibraryProcessor processor;
    private final JpaItemWriter<Library> writer;

    @Bean
    public Job availableLibraryJob() {
        return jobBuilderFactory
                .get("availableLibraryJob")
                .incrementer(new RunIdIncrementer())
                .flow(availableLibraryStep())
                .end()
                .build();
    }

    @Bean
    public Step availableLibraryStep() {
        return stepBuilderFactory
                .get("availableLibraryStep")
                .<ApiData4LibraryAvailableLibraryResponse, Library>chunk(1)

                .reader(reader)
                .processor(processor)
                .writer(writer)

                .listener(listener)
                .build();
    }

}
