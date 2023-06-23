package com.jinkyumpark.library.batch.availableLibrary.status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AvailableLibraryBatchRepository extends JpaRepository<AvailableLibraryBatch, Long> {

    @Query("select batch from AvailableLibraryBatch batch where MONTH(batch.startTime) = MONTH(:time)")
    List<AvailableLibraryBatch> findByStartTimeEqualsMonth(LocalDateTime time);

}
