package com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile.steps;

import com.jinkyumpark.core.bookIsbn.BookIsbn;
import com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile.dto.FileSeoulLibraryResponse;
import com.jinkyumpark.core.common.feign.SearchClient;
import com.jinkyumpark.core.common.feign.response.NewBookSearchResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class SeoulLibraryBookIsbnProcessor implements ItemProcessor<FileSeoulLibraryResponse, BookIsbn> {

    private final SearchClient searchClient;

    @Override
    public BookIsbn process(FileSeoulLibraryResponse fileResponse) {
        if (fileResponse.getIsbn() == null ||
                fileResponse.getPage() == null ||
                fileResponse.getPage().equals("1")) {
            return null;
        }

        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        NewBookSearchResponse bookResponse = searchClient.getNewBookByIsbnFromNaver(fileResponse.getIsbn());
        if (bookResponse == null) {
            return fileResponse.toEntity(null, null, null);
        }

        return fileResponse.toEntity(bookResponse.getCover(), bookResponse.getDescription(), bookResponse.getLink());
    }

}
