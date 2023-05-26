package com.jinkyumpark.library.library.batch.availableLibrary.steps;

import com.jinkyumpark.library.data4library.Data4LibService;
import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse;
import com.jinkyumpark.library.library.batch.availableLibrary.status.AvailableLibraryBatch;
import com.jinkyumpark.library.library.batch.availableLibrary.status.AvailableLibraryBatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class AvailableLibraryReader implements ItemReader<ApiData4LibraryAvailableLibraryResponse> {

    private final Data4LibService data4LibService;
    private final AvailableLibraryBatchService batchService;

    @Override
    public ApiData4LibraryAvailableLibraryResponse read() throws UnexpectedInputException, ParseException, NonTransientResourceException {
        List<AvailableLibraryBatch> batchByMonth = batchService.getBatchByMonth(LocalDateTime.now());
        if (batchByMonth.isEmpty()) {
            int size = 1;
            AvailableLibraryBatch availableLibraryBatch = AvailableLibraryBatch.builder()
                    .startTime(LocalDateTime.now())
                    .currentPage(1)
                    .totalPage(data4LibService.getAvailableLibraryTotalPages(size))
                    .size(size)
                    .build();
            batchService.addBatch(availableLibraryBatch);

            return data4LibService.getAvailableLibrary(1, size);
        }

        AvailableLibraryBatch batchCurrentMonth = batchByMonth.get(0);
        if (batchCurrentMonth.getCurrentPage() >= batchCurrentMonth.getTotalPage()) {
            throw new IllegalStateException("batch operations done");
        }

        return data4LibService.getAvailableLibrary(batchCurrentMonth.getCurrentPage() + 1, batchCurrentMonth.getSize());
    }

}
