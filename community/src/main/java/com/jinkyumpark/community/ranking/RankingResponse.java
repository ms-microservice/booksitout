package com.jinkyumpark.community.ranking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class RankingResponse {

    private Integer id;
    private String title;
    private String author;
    private String cover;
    private Long isbn;

}