package com.jinkyumpark.library.batch.availableLibrary;

import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.batch.availableLibrary.status.AvailableLibraryBatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.ItemWriteListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class AvailableLibraryListener implements ItemWriteListener<Library> {

    private final AvailableLibraryBatchService libraryBatchService;

    @Override
    public void beforeWrite(List<? extends Library> items) {}

    @Override
    public void afterWrite(List<? extends Library> items) {
        libraryBatchService.addPage(LocalDateTime.now());
    }

    @Override
    public void onWriteError(Exception exception, List<? extends Library> items) {}

}
