package com.jinkyumpark.community.ranking.batch;

import com.jinkyumpark.community.talk.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class PostScoreBatchConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    private final JpaPagingItemReader<Post> reader;
    private final PostScoreProcessor processor;
    private final JpaItemWriter<Post> writer;

    @Bean
    public Job postScoreJob() {
        return jobBuilderFactory
                .get("postScoreJob")
                .incrementer(new RunIdIncrementer())
                .flow(postScoreStep())
                .end()
                .build();
    }

    @Bean
    public Step postScoreStep() {
        return stepBuilderFactory
                .get("postScoreStep")
                .<Post, Post>chunk(100)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .build();
    }

}
