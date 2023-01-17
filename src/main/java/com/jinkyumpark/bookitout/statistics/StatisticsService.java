package com.jinkyumpark.bookitout.statistics;

import com.jinkyumpark.bookitout.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.statistics.model.MonthStatisticsId;
import com.jinkyumpark.bookitout.statistics.StatisticsDto;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.statistics.StatisticsRepository;
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
            return new MonthStatistics(year, month, new AppUser(appUserId));
        }

        return monthStatisticsOptional.get();
    }

    public List<MonthStatistics> getStatisticsByYear(Long appUserId, Integer year) {
        return statisticsRepository.findAllStatisticsOfYear(appUserId, year);
    }

    public void addStatistics(Long appUserId, Integer year, Integer month) {
        MonthStatistics monthStatistics = new MonthStatistics(year, month, new AppUser(appUserId));
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
