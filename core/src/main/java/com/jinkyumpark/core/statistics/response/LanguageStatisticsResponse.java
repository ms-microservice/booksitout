package com.jinkyumpark.core.statistics.response;

import com.jinkyumpark.core.book.model.BookLanguage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class LanguageStatisticsResponse {
    private BookLanguage language;
    private Integer doneBook;
    private Integer notDoneBook;
}
