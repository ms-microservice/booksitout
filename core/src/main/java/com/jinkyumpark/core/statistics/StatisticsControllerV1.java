package com.jinkyumpark.core.statistics;

import com.jinkyumpark.core.book.BookService;
import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.book.model.BookCategory;
import com.jinkyumpark.core.book.model.BookLanguage;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import com.jinkyumpark.core.reading.ReadingSessionService;
import com.jinkyumpark.core.statistics.response.CategoryStatisticsResponse;
import com.jinkyumpark.core.statistics.response.LanguageStatisticsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Deprecated
@RequiredArgsConstructor
@RestController @RequestMapping("/v1/statistics")
public class StatisticsControllerV1 {
    private final ReadingSessionService readingSessionService;
    private final BookService bookService;

    @GetMapping("read-time/{duration}")
    public List<Integer> getReadTime(@PathVariable("duration") Integer duration,
                                     @LoginUser LoginAppUser loginAppUser) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime durationDateFromToday = today.minusDays(duration - 1);

        return readingSessionService.getReadTimeByDateRange(loginAppUser.getId(), durationDateFromToday, today);
    }

    @GetMapping("language")
    public List<LanguageStatisticsResponse> getBookLanguageStatistics(@LoginUser LoginAppUser loginAppUser) {
        PageRequest pageRequest = PageRequest.of(0, 10000);
        List<Book> allBookList = bookService.getAllBooks(loginAppUser.getId(), pageRequest).getContent();

        Map<BookLanguage, Integer> doneBookLanguageMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getLanguage)
                .forEach(language -> doneBookLanguageMap.merge(language, 1, Integer::sum));

        Map<BookLanguage, Integer> notDoneBookLanguageMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> !book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getLanguage)
                .forEach(language -> notDoneBookLanguageMap.merge(language, 1, Integer::sum));

        List<LanguageStatisticsResponse> languageStatistics = new ArrayList<>();
        List<BookLanguage> bookLanguageList = List.of(
                BookLanguage.KOREAN,
                BookLanguage.ENGLISH,
                BookLanguage.JAPANESE,
                BookLanguage.CHINESE,
                BookLanguage.FRENCH,
                BookLanguage.SPANISH
        );
        for (BookLanguage language : bookLanguageList) {
            Integer doneBook = doneBookLanguageMap.getOrDefault(language, 0);
            Integer notDoneBook = notDoneBookLanguageMap.getOrDefault(language, 0);
            languageStatistics.add(new LanguageStatisticsResponse(language, doneBook, notDoneBook));
        }

        return languageStatistics;
    }

    @GetMapping("category")
    public List<CategoryStatisticsResponse> getBookCategoryStatistics(@LoginUser LoginAppUser loginAppUser) {
        PageRequest pageRequest = PageRequest.of(0, 10000);
        List<Book> allBookList = bookService.getAllBooks(loginAppUser.getId(), pageRequest).getContent();

        Map<BookCategory, Integer> doneCategoryMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getCategory)
                .forEach(category -> doneCategoryMap.merge(category, 1, Integer::sum));

        Map<BookCategory, Integer> notDoneCategoryMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> !book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getCategory)
                .forEach(category -> notDoneCategoryMap.merge(category, 1, Integer::sum));

        List<CategoryStatisticsResponse> categoryStatisticsList = new ArrayList<>();
        List<BookCategory> bookCategoryList = List.of(
                BookCategory.OTHERS,
                BookCategory.PHILOSOPHY,
                BookCategory.RELIGION,
                BookCategory.SOCIAL_SCIENCE,
                BookCategory.NATURAL_SCIENCE,
                BookCategory.TECHNOLOGY,
                BookCategory.ART,
                BookCategory.LANGUAGE,
                BookCategory.LITERATURE,
                BookCategory.HISTORY
        );

        for (BookCategory category : bookCategoryList) {
            Integer doneCategory = doneCategoryMap.getOrDefault(category, 0);
            Integer notDoneCategory = notDoneCategoryMap.getOrDefault(category, 0);
            categoryStatisticsList.add(new CategoryStatisticsResponse(category, doneCategory, notDoneCategory));
        }

        return categoryStatisticsList;
    }
}
