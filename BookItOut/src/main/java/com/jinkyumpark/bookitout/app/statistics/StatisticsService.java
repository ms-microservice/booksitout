package com.jinkyumpark.bookitout.app.statistics;

import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StatisticsService {
    private StatisticsRepository statisticsRepository;

    public Optional<MonthStatistics> getStatisticsByMonth(Long appUserId, Integer year, Integer month) {
        return statisticsRepository.findByAppUser_AppUserIdAndYearIsAndMonthIs(appUserId, year, month);
    }

    public List<MonthStatistics> getStatisticsByYear(Long appUserId, Integer year) {
        return statisticsRepository.findAllByAppUser_AppUserIdAndYearIs(appUserId, year);
    }

    public void addStatistics(Integer year, Integer month, AppUser appUser) {
        MonthStatistics monthStatistics = new MonthStatistics(year, month, appUser);
        statisticsRepository.save(monthStatistics);
    }

    @Transactional
    public void updateStatistics(MonthStatistics updatedStatistics) {
        Optional<MonthStatistics> monthStatisticsOptional = statisticsRepository
                .findByAppUser_AppUserIdAndYearIsAndMonthIs(
                        updatedStatistics.getAppUser().getAppUserId(),
                        updatedStatistics.getYear(),
                        updatedStatistics.getMonth()
                );

        if (monthStatisticsOptional.isEmpty()) {
            addStatistics(updatedStatistics.getYear(), updatedStatistics.getMonth(), updatedStatistics.getAppUser());
        }

        MonthStatistics monthStatistics = statisticsRepository
                .findByAppUser_AppUserIdAndYearIsAndMonthIs(
                        updatedStatistics.getAppUser().getAppUserId(),
                        updatedStatistics.getYear(),
                        updatedStatistics.getMonth()
                )
                .orElseThrow(RuntimeException::new);

        monthStatistics.setTotalReadMinute(updatedStatistics.getTotalReadMinute());
        monthStatistics.setFinishedBook(updatedStatistics.getFinishedBook());
        monthStatistics.setTotalStar(updatedStatistics.getTotalStar());
        monthStatistics.setMaxReadMinute(updatedStatistics.getMaxReadMinute());
        monthStatistics.setTotalPage(updatedStatistics.getTotalPage());
    }
}
