package com.jinkyumpark.community.ranking.batch;

import com.jinkyumpark.community.talk.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@RequiredArgsConstructor
@Configuration
public class PostScoreWriterConfig {

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public JpaItemWriter<Post> postScoreWriter() {
        JpaItemWriter<Post> writer = new JpaItemWriter<>();
        writer.setEntityManagerFactory(entityManagerFactory);

        return writer;
    }

}

