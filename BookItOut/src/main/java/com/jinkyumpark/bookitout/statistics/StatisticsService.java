package com.jinkyumpark.bookitout.statistics;

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

    public void addStatistics(MonthStatistics monthStatistics) {

    }

    @Transactional
    public void updateStatistics(MonthStatistics updatedStatistics) {
        Optional<MonthStatistics> monthStatisticsOptional = statisticsRepository.findByAppUser_AppUserIdAndYearIsAndMonthIs(
                updatedStatistics.getAppUser().getAppUserId(),
                updatedStatistics.getYear(),
                updatedStatistics.getMonth()
                );

        if (monthStatisticsOptional.isEmpty()) {
            throw new NotFoundException("통계를 찾을 수 없어요");
        }

        MonthStatistics monthStatistics = monthStatisticsOptional.get();

        monthStatistics.setTotalReadMinute(updatedStatistics.getTotalReadMinute());
        monthStatistics.setFinishedBook(updatedStatistics.getFinishedBook());
        monthStatistics.setTotalStar(updatedStatistics.getTotalStar());
        monthStatistics.setMaxReadMinute(updatedStatistics.getMaxReadMinute());
        monthStatistics.setTotalPage(updatedStatistics.getTotalPage());
    }
}
