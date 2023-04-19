package com.jinkyumpark.statistics;

import com.jinkyumpark.statistics.dto.BookRelatedStatistics;
import com.jinkyumpark.statistics.dto.ReadingSessionRelatedStatistics;
import com.jinkyumpark.statistics.model.DayStatistics;
import com.jinkyumpark.statistics.model.YearStatistics;
import com.jinkyumpark.statistics.response.SummaryStatistics;
import com.jinkyumpark.user.login.LoginAppUser;
import com.jinkyumpark.user.login.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@RequestMapping("v3/statistics")
public class StatisticsControllerV3 {

    private final StatisticsQueryDslService statisticsQueryDslService;

    @GetMapping("year/{year}")
    public SummaryStatistics getSummaryStatisticsByYear(@PathVariable(value = "year", required = false) Integer year,
                                                        @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();

        BookRelatedStatistics bookRelated = statisticsQueryDslService.getYearlyBookRelatedStatistics(loginAppUser.getId(), year);
        ReadingSessionRelatedStatistics readingSessionRelated = statisticsQueryDslService.getYearlyReadingSessionRelatedStatistics(loginAppUser.getId(), year);

        YearStatistics yearStatistics = YearStatistics.builder()
                .totalReadTime(readingSessionRelated.getTotalReadTime())
                .totalReadPage(readingSessionRelated.getTotalReadPage())
                .totalReadBookCount(bookRelated.getTotalReadBookCount())
                .averageStar(bookRelated.getAverageRating())
                .build();

        DayStatistics dayStatistics = DayStatistics.builder()
                .averageReadTime(readingSessionRelated.getAverageReadTime())
                .mostReadTime(readingSessionRelated.getMostReadTime())
                .build();

        return new SummaryStatistics(HttpStatus.OK.value(), year, yearStatistics, dayStatistics, 50);
    }

}
