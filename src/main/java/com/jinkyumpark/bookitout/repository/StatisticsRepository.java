package com.jinkyumpark.bookitout.repository;

import com.jinkyumpark.bookitout.model.statistics.MonthStatistics;
import com.jinkyumpark.bookitout.model.statistics.MonthStatisticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface StatisticsRepository extends JpaRepository<MonthStatistics, Long> {
    @Query("select m from month_statistics m where m.monthStatisticsId = ?1")
    Optional<MonthStatistics> findByMonthStatisticsId(MonthStatisticsId monthStatisticsId);

    @Query("select m from month_statistics m where m.monthStatisticsId.appUserId = ?1 and m.monthStatisticsId.year = ?2")
    List<MonthStatistics> findAllStatisticsOfYear(Long appUserId, Integer year);
}