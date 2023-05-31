package com.jinkyumpark.library.library.batch;

import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse;
import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.library.batch.status.AvailableLibraryBatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.SkipListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class AvailableLibrarySkipListener implements SkipListener<ApiData4LibraryAvailableLibraryResponse, Library> {

    private final AvailableLibraryBatchService libraryBatchService;


    @Override
    public void onSkipInRead(Throwable t) {

    }

    @Override
    public void onSkipInWrite(Library item, Throwable t) {
        libraryBatchService.addPage(LocalDateTime.now());
    }

    @Override
    public void onSkipInProcess(ApiData4LibraryAvailableLibraryResponse item, Throwable t) {

    }
}
