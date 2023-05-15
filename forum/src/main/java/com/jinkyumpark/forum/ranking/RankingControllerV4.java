package com.jinkyumpark.forum.ranking;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor

@RequestMapping("v4/forum/ranking")
@RestController
public class RankingControllerV4 {

    private final RankingService rankingService;

    @GetMapping
    public List<RankingResponse> getRankingByDate(@RequestParam(value = "year", required = false) Integer year,
                                                  @RequestParam(value = "month", required = false) Integer month,
                                                  @RequestParam(value = "day", required = false) Integer day,
                                                  @RequestParam(value = "size", required = false) Integer size) {
        if (year == null) year = LocalDate.now().getYear();
        if (month == null) month = LocalDate.now().getMonthValue();
        if (day == null) day = LocalDate.now().getDayOfMonth();

        if (size == null) size = 10;

        LocalDate requestedDay = LocalDate.of(year, month, day);

        return rankingService.getRankingByDate(requestedDay, size);
    }

}