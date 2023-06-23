package com.jinkyumpark.core.batch.seoulLibraryFile.steps;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jinkyumpark.core.batch.seoulLibraryFile.dto.FileSeoulLibraryResponse;
import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Iterator;

@Configuration
public class SeoulLibraryBookIsbnReaderV1 {

    private final ObjectMapper objectMapper;
    public SeoulLibraryBookIsbnReaderV1(@Qualifier("fileSeoulLibraryObjectMapper") ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    private static final String DATA_FILE_PATH = "data/seoulLibraryBooks.json";

    @Bean
    public ItemReader<FileSeoulLibraryResponse> itemReader() {

        return new ItemReader<>() {
            private JsonParser jsonParser;
            private Iterator<FileSeoulLibraryResponse> iterator;

            @Override
            public FileSeoulLibraryResponse read() {
                if (jsonParser == null) {
                    try {
                        jsonParser = objectMapper.getFactory().createParser(new File(DATA_FILE_PATH));
                        iterator = objectMapper.readValues(jsonParser, FileSeoulLibraryResponse.class);
                    } catch (IOException e) {
                        throw new UncheckedIOException(e);
                    }
                }

                if (iterator.hasNext()) return iterator.next();
                return null;
            }
        };

    }

}
