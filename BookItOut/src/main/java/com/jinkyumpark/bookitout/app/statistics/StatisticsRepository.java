package com.jinkyumpark.bookitout.app.statistics;

import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<MonthStatistics, Long> {
    @Query("select m from month_statistics m where m.appUser.appUserId = ?1 and m.year = ?2 and m.month = ?3")
    Optional<MonthStatistics> findByAppUser_AppUserIdAndYearIsAndMonthIs(Long AppUserId, Integer year, Integer month);

    @Query("select m from month_statistics m where m.appUser.appUserId = ?1 and m.year = ?2")
    List<MonthStatistics> findAllByAppUser_AppUserIdAndYearIs(Long appUserId, Integer year);

    @Query("select m from month_statistics m where m.appUser.appUserId = ?1 and m.year = ?2 and m.month = ?3")
    Optional<MonthStatistics> findByAppUser_AppUserIdAndYearAndMonth(Long appUserId, Integer year, Integer month);
}