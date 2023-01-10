package com.jinkyumpark.bookitout.response.statistics;

import com.jinkyumpark.bookitout.model.book.BookLanguage;
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
