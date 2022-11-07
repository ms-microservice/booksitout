package com.jinkyumpark.bookitout.statistics;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StatisticsService {
    private StatisticsRepository statisticsRepository;

    public Optional<MonthStatistics> getStatisticsByMonth(Integer year, Integer month) {
        return statisticsRepository.findStatisticsByYearIsAndMonthIs(year, month);
    }

    public List<MonthStatistics> getStatisticsByYear(Integer year) {
        return statisticsRepository.findAllByYearIs(year);
    }
}
