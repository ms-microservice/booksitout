package com.jinkyumpark.bookitout.statistics.response;

import com.jinkyumpark.bookitout.book.model.BookCategory;
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
