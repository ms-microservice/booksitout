package com.jinkyumpark.core.batch.seoulLibraryFile.steps;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.jinkyumpark.core.batch.seoulLibraryFile.dto.FileSeoulLibraryResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.nio.file.Files;
import java.nio.file.Paths;

@Slf4j
@Primary
@Configuration
public class SeoulLibraryBookIsbnReaderV2 implements ItemReader<FileSeoulLibraryResponse>, StepExecutionListener {

    private static final String DATA_FILE_PATH = "data/seoulLibraryBooks.json";

    private final ObjectReader objectReader;
    private MappingIterator<FileSeoulLibraryResponse> dataIterator;

    private long currentLine = 0L;
    private long startLine;
    private long endLine;

    public SeoulLibraryBookIsbnReaderV2(@Qualifier("fileSeoulLibraryObjectMapper") ObjectMapper objectMapper) {
        this.objectReader = objectMapper.readerFor(FileSeoulLibraryResponse.class);
    }

    @Override
    public void beforeStep(StepExecution stepExecution) {
        startLine = 50_001;
        endLine = 10_000L;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        return null;
    }

    @Override
    public FileSeoulLibraryResponse read() throws Exception {
        if (dataIterator == null) {
            dataIterator = objectReader.readValues(Files.newBufferedReader(Paths.get(DATA_FILE_PATH)));

            while (currentLine < startLine && dataIterator.hasNext()) {
                dataIterator.next();
                currentLine++;
            }
        }

        if (currentLine > endLine) {
            return null;
        }

        if (dataIterator.hasNext()) {
            log.info("Current Line : {}", currentLine);
            currentLine++;
            return dataIterator.next();
        }

        return null;
    }

}
