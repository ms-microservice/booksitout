package com.jinkyumpark.bookitout.statistics;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/statistics")
public class StatisticsControllerV1 {
    private StatisticsService statisticsService;

    @GetMapping("/month")
    public Statistics getStatisticsByMonth(@RequestParam(value = "year", required = false) Integer year,
                                           @RequestParam(value = "month", required = false) Integer month) {
        if (year == null) {
            year = LocalDateTime.now().getYear();
        }

        if (month == null) {
            month = LocalDateTime.now().getMonthValue();
        }

        Optional<Statistics> statisticsOptional = statisticsService.getStatisticsByMonth(year, month);

        if (statisticsOptional.isEmpty()) {
            return null;
        }

        return statisticsOptional.get();
    }

    @GetMapping("/year")
    public Statistics getStatisticsByYear(@RequestParam(value = "year", required = false) Integer year) {
        if (year == null) {
            year = LocalDateTime.now().getYear();
        }

        List<Statistics> statisticsList = statisticsService.getStatisticsByYear(year);

        int totalReadMinute = statisticsList.stream()
                .mapToInt(Statistics::getTotalReadMinute)
                .sum();

        int totalStar = statisticsList.stream()
                .mapToInt(Statistics::getTotalStar)
                .sum();

        int totalFinishedBook = statisticsList.stream()
                .mapToInt(Statistics::getFinishedBook)
                .sum();

        int totalPage = statisticsList.stream()
                .mapToInt(Statistics::getTotalPage)
                .sum();

        int maxReadMinuteInDay = statisticsList.stream()
                .mapToInt(Statistics::getMaxReadMinute)
                .max().orElse(0);

        Statistics yearStatistics = new Statistics();
        yearStatistics.setYear(year);
        yearStatistics.setTotalReadMinute(totalReadMinute);
        yearStatistics.setFinishedBook(totalFinishedBook);
        yearStatistics.setTotalStar(totalStar);
        yearStatistics.setMaxReadMinute(maxReadMinuteInDay);
        yearStatistics.setTotalPage(totalPage);

        return yearStatistics;
    }
}
