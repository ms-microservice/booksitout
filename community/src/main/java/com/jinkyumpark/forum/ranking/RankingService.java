package com.jinkyumpark.forum.ranking;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor

@Service
public class RankingService {

    public List<RankingResponse> getRankingByDate(LocalDate localDate, int size) {
        return List.of(
                RankingResponse.builder()
                        .id(1)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(2)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(3)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(4)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(5)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(6)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(7)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(8)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(9)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(10)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build(),
                RankingResponse.builder()
                        .id(11)
                        .title("유난한 도전").author("정경화").isbn(9791191211863L)
                        .build()
        ).subList(0, size);
    }

}
