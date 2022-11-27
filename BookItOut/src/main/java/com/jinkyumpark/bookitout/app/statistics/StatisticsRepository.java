package com.jinkyumpark.bookitout.app.statistics;

import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<MonthStatistics, Long> {
    Optional<MonthStatistics> findByAppUser_AppUserIdAndYearIsAndMonthIs(Long AppUserId, Integer year, Integer month);
    List<MonthStatistics> findAllByAppUser_AppUserIdAndYearIs(Long appUserId, Integer year);
    Optional<MonthStatistics> findByAppUser_AppUserIdAndYearAndMonth(Long appUserId, Integer year, Integer month);
}
