package com.jinkyumpark.library.library.batch.availableLibrary.steps;

import com.jinkyumpark.library.library.Library;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@RequiredArgsConstructor
@Configuration
public class AvailableLibraryWriter {

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public JpaItemWriter<Library> libraryWriter() {
        JpaItemWriter<Library> writer = new JpaItemWriter<>();
        writer.setEntityManagerFactory(entityManagerFactory);

        return writer;
    }

}
