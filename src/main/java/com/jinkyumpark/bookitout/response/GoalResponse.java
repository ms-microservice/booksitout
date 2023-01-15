package com.jinkyumpark.bookitout.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class GoalResponse {
    private Integer year;
    private Integer goal;
    private Integer current;
}