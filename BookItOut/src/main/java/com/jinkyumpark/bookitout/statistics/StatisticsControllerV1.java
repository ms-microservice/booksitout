package com.jinkyumpark.bookitout.statistics;

import com.jinkyumpark.bookitout.statistics.response.Daily;
import com.jinkyumpark.bookitout.statistics.response.ReadTimeResponse;
import com.jinkyumpark.bookitout.statistics.response.SummaryStatistics;
import com.jinkyumpark.bookitout.statistics.response.Yearly;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping("month")
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

    @GetMapping("year/{year}")
    public SummaryStatistics getStatisticsByYear(@PathVariable(value = "year", required = false) Integer year) {
        if (year == null) year = LocalDateTime.now().getYear();
        Long loginUserId = AppUserService.getLoginAppUserId();

        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(loginUserId, year);

        int totalReadTime = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalReadMinute)
                .sum();

        int totalReadBookCount = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getFinishedBook)
                .sum();

        int totalStar = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalStar)
                .sum();
        double averageStar = totalStar / (totalReadBookCount == 0 ? 1 : totalReadBookCount* 1.0);

        int totalReadPage = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalPage)
                .sum();

        boolean isThisYear = LocalDateTime.now().getYear() == year;
        int averageReadTime = totalReadTime / (
                isThisYear ?
                LocalDateTime.now().getDayOfYear()
                : 365
        );

        int mostReadTime = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getMaxReadMinute)
                .max().orElse(0);

        // TODO : Goal

        Yearly yearly = new Yearly(totalReadTime, totalReadBookCount, averageStar, totalReadPage);
        Daily daily = new Daily(averageReadTime, mostReadTime);
        SummaryStatistics summaryStatistics = new SummaryStatistics(HttpStatus.OK.value(), year, yearly, daily, 50);

        return summaryStatistics;
    }

    @GetMapping("/read-time/{day}")
    public ReadTimeResponse getReadTime(@PathVariable("day") Integer dayRange) {
        List<Integer> readTimeList = new ArrayList<>();

        for (int i = 0; i < dayRange; i++) {
            readTimeList.add((int) (Math.random() * 100));
        }

        return new ReadTimeResponse(200, readTimeList);
    }
}
