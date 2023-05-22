package com.jinkyumpark.community.ranking.batch;

import com.jinkyumpark.community.talk.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@RequiredArgsConstructor
@Configuration
public class PostScoreReaderConfig {

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public JpaPagingItemReader<Post> postScoreReader() {
        JpaPagingItemReader<Post> reader = new JpaPagingItemReader<>();
        reader.setEntityManagerFactory(entityManagerFactory);
        reader.setQueryString("SELECT p FROM Post p ORDER BY p.createdDate DESC");
        reader.setPageSize(10);
        reader.setMaxItemCount(100);

        return reader;
    }

}

