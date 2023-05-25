package com.jinkyumpark.community.ranking;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor

@Service
public class RankingService {

    public List<RankingResponse> getBookRankingByDate(LocalDate localDate, int size) {
        return List.of();
    }

}
