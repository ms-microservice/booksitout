package com.jinkyumpark.core.statistics;

import com.jinkyumpark.core.statistics.model.MonthStatistics;
import com.jinkyumpark.core.statistics.model.MonthStatisticsId;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class StatisticsService {
    private final MessageSourceAccessor messageSource;
    private final StatisticsRepository statisticsRepository;

    public MonthStatistics getStatisticsByMonth(Long appUserId, Integer year, Integer month) {
        MonthStatisticsId monthStatisticsId = new MonthStatisticsId(appUserId, year, month);
        Optional<MonthStatistics> monthStatisticsOptional = statisticsRepository.findByMonthStatisticsId(monthStatisticsId);

        if (monthStatisticsOptional.isEmpty()) {
            addStatistics(appUserId, year, month);
            return new MonthStatistics(year, month, appUserId);
        }

        return monthStatisticsOptional.get();
    }

    public List<MonthStatistics> getStatisticsByYear(Long appUserId, Integer year) {
        return statisticsRepository.findAllStatisticsOfYear(appUserId, year);
    }

    public void addStatistics(Long appUserId, Integer year, Integer month) {
        MonthStatistics monthStatistics = new MonthStatistics(year, month, appUserId);
        statisticsRepository.save(monthStatistics);
    }

    @Transactional
    public void updateStatistics(Integer year, Integer month, StatisticsDto statisticsDto, Long loginUserId) {
        MonthStatisticsId monthStatisticsId = new MonthStatisticsId(loginUserId, year, month);
        Optional<MonthStatistics> monthStatisticsOptional = statisticsRepository
                .findByMonthStatisticsId(monthStatisticsId);

        if (monthStatisticsOptional.isEmpty()) {
            addStatistics(loginUserId, year, month);
        }

        MonthStatistics monthStatistics = statisticsRepository
                .findByMonthStatisticsId(monthStatisticsId)
                .orElseThrow(RuntimeException::new);

        monthStatistics.editStatistics(statisticsDto);
    }
}
