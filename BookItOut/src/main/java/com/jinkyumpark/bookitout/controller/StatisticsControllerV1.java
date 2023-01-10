package com.jinkyumpark.bookitout.controller;

import com.jinkyumpark.bookitout.service.StatisticsService;
import com.jinkyumpark.bookitout.service.BookService;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.model.book.BookCategory;
import com.jinkyumpark.bookitout.model.book.BookLanguage;
import com.jinkyumpark.bookitout.model.statistics.MonthStatistics;
import com.jinkyumpark.bookitout.model.statistics.DayStatistics;
import com.jinkyumpark.bookitout.service.ReadingSessionService;
import com.jinkyumpark.bookitout.response.statistics.CategoryStatisticsResponse;
import com.jinkyumpark.bookitout.response.statistics.LanguageStatisticsResponse;
import com.jinkyumpark.bookitout.response.statistics.SummaryStatistics;
import com.jinkyumpark.bookitout.model.statistics.YearStatistics;
import com.jinkyumpark.bookitout.user.AppUserService;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/statistics")
public class StatisticsControllerV1 {
    private final StatisticsService statisticsService;
    private final ReadingSessionService readingSessionService;
    private final BookService bookService;

    @GetMapping("month")
    public MonthStatistics getStatisticsByMonth(@RequestParam(value = "year", required = false) Integer year,
                                                @RequestParam(value = "month", required = false) Integer month,
                                                @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();
        if (month == null) month = LocalDateTime.now().getMonthValue();

        return statisticsService.getStatisticsByMonth(loginAppUser.getId(), year, month);
    }

    @GetMapping("year/{year}")
    public SummaryStatistics getStatisticsByYear(@PathVariable(value = "year", required = false) Integer year, @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();

        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(loginAppUser.getId(), year);

        int totalReadTimeMinute = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalReadMinute)
                .sum();

        int totalReadBookCount = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getFinishedBook)
                .sum();

        int totalStar = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalStar)
                .sum();
        double averageStar = totalStar / (totalReadBookCount == 0 ? 1 : totalReadBookCount * 1.0);

        int totalReadPage = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalPage)
                .sum();

        boolean isThisYear = LocalDateTime.now().getYear() == year;
        int averageReadTime = totalReadTimeMinute / (
                isThisYear ?
                        LocalDateTime.now().getDayOfYear()
                        : 365
        );

        int mostReadTime = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getMaxReadMinute)
                .max().orElse(0);

        // TODO : Goal

        YearStatistics yearStatistics = new YearStatistics(totalReadTimeMinute, totalReadBookCount, averageStar, totalReadPage);
        DayStatistics dayStatistics = new DayStatistics(averageReadTime, mostReadTime);
        SummaryStatistics summaryStatistics = new SummaryStatistics(HttpStatus.OK.value(), year, yearStatistics, dayStatistics, 50);

        return summaryStatistics;
    }

    @GetMapping("read-time/{duration}")
    public List<Integer> getReadTime(@PathVariable("duration") Integer duration, @LoginUser LoginAppUser loginAppUser) {
        return readingSessionService.getReadTimeByDateRange(loginAppUser.getId(), LocalDateTime.now().minusDays(duration - 1), LocalDateTime.now());
    }

    @GetMapping("language")
    public List<LanguageStatisticsResponse> getBookLanguageStatistics() {
        Long loginUserId = AppUserService.getLoginAppUserId();

        PageRequest pageRequest = PageRequest.of(0, 10000);
        List<Book> allBookList = bookService.getAllBooks(loginUserId, pageRequest).getContent();

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
