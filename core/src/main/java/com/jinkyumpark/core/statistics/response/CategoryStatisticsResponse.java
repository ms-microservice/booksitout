package com.jinkyumpark.core.statistics.response;

import com.jinkyumpark.core.book.model.book.BookMainCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class CategoryStatisticsResponse {
    private BookMainCategory category;
    private Integer doneCategory;
    private Integer notDoneCategory;
}
