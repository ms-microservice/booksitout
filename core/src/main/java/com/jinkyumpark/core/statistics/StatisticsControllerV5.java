package com.jinkyumpark.core.statistics;

import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import com.jinkyumpark.core.reading.ReadingSessionService;
import com.jinkyumpark.core.statistics.dto.CurrentStatistics;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/statistics")
public class StatisticsControllerV5 {

    private final ReadingSessionService readingSessionService;

    @GetMapping("current")
    public CurrentStatistics getCurrentStatistics(@LoginUser LoginAppUser user) {
        Integer currentlyReading = readingSessionService.getCurrentlyReading();
        Integer consecutiveReadingDayCount = readingSessionService.getConsecutiveReadingDayCount(user.getId());

        return CurrentStatistics.builder()
                .currentReading(currentlyReading)
                .consecutiveReading(consecutiveReadingDayCount)
                .build();
    }

}
