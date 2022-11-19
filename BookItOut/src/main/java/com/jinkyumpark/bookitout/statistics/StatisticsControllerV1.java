package com.jinkyumpark.bookitout.statistics;

import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/statistics")
public class StatisticsControllerV1 {
    private StatisticsService statisticsService;

    @GetMapping("/month")
    public MonthStatistics getStatisticsByMonth(@RequestParam(value = "year", required = false) Integer year,
                                                @RequestParam(value = "month", required = false) Integer month) {
        if (year == null) {
            year = LocalDateTime.now().getYear();
        }

        if (month == null) {
            month = LocalDateTime.now().getMonthValue();
        }

        Long loginUserId = AppUserService.getLoginAppUserId();

        Optional<MonthStatistics> statisticsOptional = statisticsService.getStatisticsByMonth(loginUserId, year, month);

        if (statisticsOptional.isEmpty()) {
            return null;
        }

        return statisticsOptional.get();
    }

    @GetMapping("/year")
    public MonthStatistics getStatisticsByYear(@RequestParam(value = "year", required = false) Integer year) {
        if (year == null) {
            year = LocalDateTime.now().getYear();
        }
        Long loginUserId = AppUserService.getLoginAppUserId();

        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(loginUserId, year);

        int totalReadMinute = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalReadMinute)
                .sum();

        int totalStar = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalStar)
                .sum();

        int totalFinishedBook = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getFinishedBook)
                .sum();

        int totalPage = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalPage)
                .sum();

        int maxReadMinuteInDay = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getMaxReadMinute)
                .max().orElse(0);

        MonthStatistics yearMonthStatistics = new MonthStatistics();
        yearMonthStatistics.setYear(year);
        yearMonthStatistics.setTotalReadMinute(totalReadMinute);
        yearMonthStatistics.setFinishedBook(totalFinishedBook);
        yearMonthStatistics.setTotalStar(totalStar);
        yearMonthStatistics.setMaxReadMinute(maxReadMinuteInDay);
        yearMonthStatistics.setTotalPage(totalPage);

        return yearMonthStatistics;
    }

    @GetMapping("/read-time/{day}")
    public List<Integer> getReadTime(@PathVariable("day") Integer dayRange) {
        List<Integer> readTimeList = new ArrayList<>();

        for (int i = 0; i < dayRange; i++) {
            readTimeList.add((int) (Math.random() * 100));
        }

        return readTimeList;
    }
}
