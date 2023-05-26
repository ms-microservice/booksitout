package com.jinkyumpark.library.library.batch.availableLibrary.status;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AvailableLibraryBatchService {

    private final AvailableLibraryBatchRepository availableLibraryBatchRepository;

    public List<AvailableLibraryBatch> getBatchByMonth(LocalDateTime time) {
        return availableLibraryBatchRepository.findByStartTimeEqualsMonth(time);
    }

    public AvailableLibraryBatch addBatch(AvailableLibraryBatch availableLibraryBatch) {
        return availableLibraryBatchRepository.save(availableLibraryBatch);
    }

    @Transactional
    public void addPage(LocalDateTime time) {
        List<AvailableLibraryBatch> batchByMonth = this.getBatchByMonth(time);

        if (!batchByMonth.isEmpty()) {
            batchByMonth.get(0).addPage();
        }

    }

}
