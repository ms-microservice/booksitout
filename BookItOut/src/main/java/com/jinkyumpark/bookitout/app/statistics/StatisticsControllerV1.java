package com.jinkyumpark.bookitout.app.statistics;

import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.app.statistics.model.DayStatistics;
import com.jinkyumpark.bookitout.app.readingsession.ReadingSessionService;
import com.jinkyumpark.bookitout.app.statistics.response.ReadTimeResponse;
import com.jinkyumpark.bookitout.app.statistics.response.SummaryStatistics;
import com.jinkyumpark.bookitout.app.statistics.model.YearStatistics;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController @RequestMapping("/v1/statistics")
public class StatisticsControllerV1 {
    private StatisticsService statisticsService;
    private ReadingSessionService readingSessionService;

    @GetMapping("month")
    public MonthStatistics getStatisticsByMonth(@RequestParam(value = "year", required = false) Integer year,
                                                @RequestParam(value = "month", required = false) Integer month) {
        if (year == null) year = LocalDateTime.now().getYear();
        if (month == null) month = LocalDateTime.now().getMonthValue();
        Long loginUserId = AppUserService.getLoginAppUserId();

        return statisticsService.getStatisticsByMonth(loginUserId, year, month);
    }

    @GetMapping("year/{year}")
    public SummaryStatistics getStatisticsByYear(@PathVariable(value = "year", required = false) Integer year) {
        if (year == null) year = LocalDateTime.now().getYear();
        Long loginUserId = AppUserService.getLoginAppUserId();

        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(loginUserId, year);

        int totalReadTimeMinute = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalReadMinute)
                .sum();

        int totalReadBookCount = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getFinishedBook)
                .sum();

        int totalStar = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalStar)
                .sum();
        double averageStar = totalStar / (totalReadBookCount == 0 ? 1 : totalReadBookCount * 1.0);

        int totalReadPage = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalPage)
                .sum();

        boolean isThisYear = LocalDateTime.now().getYear() == year;
        int averageReadTime = totalReadTimeMinute / (
                isThisYear ?
                        LocalDateTime.now().getDayOfYear()
                        : 365
        );

        int mostReadTime = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getMaxReadMinute)
                .max().orElse(0);

        // TODO : Goal

        YearStatistics yearStatistics = new YearStatistics(totalReadTimeMinute, totalReadBookCount, averageStar, totalReadPage);
        DayStatistics dayStatistics = new DayStatistics(averageReadTime, mostReadTime);
        SummaryStatistics summaryStatistics = new SummaryStatistics(HttpStatus.OK.value(), year, yearStatistics, dayStatistics, 50);

        return summaryStatistics;
    }

    @GetMapping("/read-time/{day}")
    public List<Integer> getReadTime(@PathVariable("day") Integer dayRange) {
        Long loginUserId = AppUserService.getLoginAppUserId();

        return readingSessionService.getReadTimeByDateRange(loginUserId, LocalDateTime.now().minusDays(dayRange + 1), LocalDateTime.now());
    }
}
