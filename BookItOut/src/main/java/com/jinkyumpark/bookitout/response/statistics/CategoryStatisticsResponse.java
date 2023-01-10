package com.jinkyumpark.bookitout.response.statistics;

import com.jinkyumpark.bookitout.model.book.BookCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class CategoryStatisticsResponse {
    private BookCategory category;
    private Integer doneCategory;
    private Integer notDoneCategory;
}
