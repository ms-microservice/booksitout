package com.jinkyumpark.core.statistics;

import com.jinkyumpark.core.statistics.dto.BookRelatedStatistics;
import com.jinkyumpark.core.statistics.dto.ReadingSessionRelatedStatistics;
import com.jinkyumpark.core.statistics.dto.DayStatistics;
import com.jinkyumpark.core.statistics.dto.YearStatistics;
import com.jinkyumpark.core.statistics.response.SummaryStatistics;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController @RequestMapping("v3/statistics")
public class StatisticsControllerV3 {

    private final StatisticsQueryDslRepository statisticsQueryDslRepository;

    @GetMapping("year/{year}")
    public SummaryStatistics getSummaryStatisticsByYear(@PathVariable(value = "year", required = false) Integer year,
                                                        @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();

        BookRelatedStatistics bookRelated = statisticsQueryDslRepository.getYearlyBookRelatedStatistics(loginAppUser.getId(), year);
        ReadingSessionRelatedStatistics readingSessionRelated = statisticsQueryDslRepository.getYearlyReadingSessionRelatedStatistics(loginAppUser.getId(), year);

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

        return new SummaryStatistics(HttpStatus.OK.value(), year, yearStatistics, dayStatistics);
    }

}
