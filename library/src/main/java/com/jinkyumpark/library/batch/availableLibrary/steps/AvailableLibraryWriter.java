package com.jinkyumpark.library.batch.availableLibrary.steps;

import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.library.LibraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@RequiredArgsConstructor
@Configuration
public class AvailableLibraryWriter {

    private final EntityManagerFactory entityManagerFactory;
    private final LibraryService libraryService;

    @Bean
    public ItemWriter<Library> libraryWriter() {
        return items -> {
            JpaItemWriter<Library> writer = new JpaItemWriter<>();
            writer.setEntityManagerFactory(entityManagerFactory);

            writer.write(items);
        };

    }

}
