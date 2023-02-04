package com.jinkyumpark.bookitout.search;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinItem;
import com.jinkyumpark.bookitout.search.request.KoreaRegion;
import com.jinkyumpark.bookitout.search.request.SeoulRegionDetail;
import com.jinkyumpark.bookitout.search.response.*;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.common.exception.http.BadRequestException;
import com.jinkyumpark.bookitout.search.response.library.*;
import com.jinkyumpark.bookitout.search.response.used.UsedBookProvider;
import com.jinkyumpark.bookitout.search.response.used.UsedBookSearchResponse;
import com.jinkyumpark.bookitout.search.response.used.UsedBookSearchResult;
import com.jinkyumpark.bookitout.search.service.SearchBookService;
import com.jinkyumpark.bookitout.search.service.SearchLibraryService;
import com.jinkyumpark.bookitout.search.service.SearchSubscriptionService;
import com.jinkyumpark.bookitout.search.service.SearchUsedService;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.user.login.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("v2/search")
public class SearchControllerV2 {
    private final BookService bookService;
    private final SearchLibraryService searchLibraryService;
    private final SearchUsedService searchUsedService;
    private final SearchBookService searchBookService;
    private final SearchSubscriptionService searchSubscriptionService;

    @GetMapping("my-book")
    public List<MyBookSearchResult> getMyBookSearchResult(@RequestParam("query") String query,
                                                          @LoginUser LoginAppUser loginAppUser) {
        if (query.length() < 2) throw new BadRequestException("Query must be more than 2");

        List<Book> bookResult = bookService.getBookByQuery(loginAppUser.getId(), query);

        return bookResult.stream()
                .map(b -> MyBookSearchResult.builder()
                        .bookId(b.getBookId())
                        .title(b.getTitle())
                        .author(b.getAuthor())
                        .cover(b.getCover())
                        .currentPage(b.getCurrentPage())
                        .endPage(b.getEndPage())
                        .isGiveUp(b.getIsGiveUp())
                        .build())
                .collect(Collectors.toList());
    }

    @GetMapping("library/by-region")
    public List<OfflineLibrarySearchResultV2> getLibrarySearchResultByRegion(@RequestParam("query") String query,
                                                                             @RequestParam("region") String region,
                                                                             @RequestParam("region-detail") String regionDetail) {
        List<AladinItem> aladinResponse = searchBookService.getAladinItemByQuery(query, 5);
        Map<String, AladinItem> isbnToAladinItemMap = aladinResponse.stream()
                .collect(Collectors.toMap(AladinItem::getIsbn13, Function.identity()));

        List<OfflineLibrarySearchResultV2> result = new ArrayList<>();
        for (String isbn : isbnToAladinItemMap.keySet()) {
            List<AvailableLibrary> availableLibraryList = searchLibraryService.getAvailableLibrary(
                    isbn,
                    KoreaRegion.valueOf(region).getApiRegionCode(),
                    SeoulRegionDetail.valueOf(regionDetail).getApiRegionCode()
            );

            if (availableLibraryList.isEmpty()) continue;

            result.add(OfflineLibrarySearchResultV2.builder()
                    .book(LibraryBook.builder()
                            .title(isbnToAladinItemMap.get(isbn).getTitle())
                            .author(isbnToAladinItemMap.get(isbn).getAuthor())
                            .cover(isbnToAladinItemMap.get(isbn).getCover())
                            .build())
                    .libraryList(availableLibraryList)
                    .build());
        }

        return result;
    }

    @GetMapping("online-library")
    public List<OnlineLibrarySearchResult> getOnlineLibrarySearchResult(@RequestParam("query") String query,
                                                                        @RequestParam("include") List<String> includeList) {
        if (query.length() < 2) throw new BadRequestException("");
        if (includeList.size() == 0) throw new BadRequestException("");

        List<OnlineLibrarySearchResult> result = new ArrayList<>();

        if (includeList.contains("SEOUL_EDUCATION_LIBRARY"))
            result.addAll(searchLibraryService.getSeoulEducationLibrarySearchResult(query));

        return result;
    }

    @GetMapping("subscription")
    public List<SubscriptionSearchResult> getSubscriptionSearchResult(@RequestParam("query") String query,
                                                                      @RequestParam("include") List<String> includeList) {
        if (includeList.isEmpty()) throw new BadRequestException("include list cannot be empty");

        List<SubscriptionSearchResult> searchResultList = new ArrayList<>();

        if (includeList.contains("MILLIE")) {
            searchSubscriptionService.getMilleSearchResult(query);
        }

        if (includeList.contains("RIDI")) {
            searchSubscriptionService.getRidiSearchResult(query);
        }

        if (includeList.contains("YES24")) {
            List<SubscriptionSearchResult> yes24SearchResult = searchSubscriptionService.getYes24SearchResult(query);
            searchResultList.addAll(yes24SearchResult);
        }

        return searchResultList;
    }

    // 교보분고, 알라딘, YES24
    @GetMapping("used")
    public UsedBookSearchResponse getUsedOnlineSearchResult(@RequestParam("query") String query,
                                                            @RequestParam("include") List<String> includeList) {
        if (includeList.isEmpty()) throw new BadRequestException("최소 1가지의 검색대상을 포함해 주세요");

        UsedBookSearchResponse result = new UsedBookSearchResponse();

        if (includeList.contains("ALADIN")) {
            List<AladinItem> aladinItemList = searchUsedService.getAladinUsedBook(query);

            List<UsedBookSearchResult> aladinOnlineSearchResult = aladinItemList.stream()
                    .filter(item -> item.getSubInfo() != null && item.getSubInfo().getUsedList().getAladinUsed().getItemCount() != 0)
                    .map(item -> item.toUsedBookSearchResult(UsedBookProvider.ONLINE_ALADIN)).toList();

            List<UsedBookSearchResult> aladinOfflineSearchResult = aladinItemList.stream()
                    .filter(item -> item.getSubInfo() != null && item.getSubInfo().getUsedList().getSpaceUsed().getItemCount() != 0)
                    .map(item -> item.toUsedBookSearchResult(UsedBookProvider.OFFLINE_ALADIN)).toList();

            result.addOnlineList(aladinOnlineSearchResult);
            result.addOfflineList(aladinOfflineSearchResult);
        }

        if (includeList.contains("KYOBO")) {}

        if (includeList.contains("YES24")) {
            List<UsedBookSearchResult> yes24ResultList = searchUsedService.getYes24OfflineUsedBook(query);

            result.addOfflineList(yes24ResultList);
        }

        return result;
    }
}