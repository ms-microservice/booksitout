package com.jinkyumpark.bookitout.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<MonthStatistics, Long> {
    Optional<MonthStatistics> findStatisticsByYearIsAndMonthIs(Integer year, Integer month);
    List<MonthStatistics> findAllByYearIs(Integer year);
}
