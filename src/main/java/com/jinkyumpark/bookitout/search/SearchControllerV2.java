package com.jinkyumpark.bookitout.search;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.ApiAladinItem;
import com.jinkyumpark.bookitout.search.request.KoreaRegion;
import com.jinkyumpark.bookitout.search.request.SeoulRegionDetail;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.common.exception.http.BadRequestException;
import com.jinkyumpark.bookitout.search.response.library.*;
import com.jinkyumpark.bookitout.search.provider.UsedBookProvider;
import com.jinkyumpark.bookitout.search.response.searchResult.*;
import com.jinkyumpark.bookitout.search.response.UsedBookSearchResponse;
import com.jinkyumpark.bookitout.search.service.SearchBookService;
import com.jinkyumpark.bookitout.search.service.SearchLibraryService;
import com.jinkyumpark.bookitout.search.service.SearchSubscriptionService;
import com.jinkyumpark.bookitout.search.service.SearchUsedService;
import com.jinkyumpark.bookitout.settings.model.MyBookSearchRange;
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
                                                          @RequestParam(value = "range", required = false) MyBookSearchRange myBookSearchRange,
                                                          @LoginUser LoginAppUser loginAppUser) {
        if (query.length() < 2) throw new BadRequestException("Query must be more than 2");
        if (myBookSearchRange == null) myBookSearchRange = MyBookSearchRange.ALL;

        List<Book> bookResult = bookService.getBookByQuery(loginAppUser.getId(), query, myBookSearchRange);

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

    @GetMapping("library/offline/by-region")
    public List<OfflineLibrarySearchResult> getLibrarySearchResultByRegion(@RequestParam("query") String query,
                                                                           @RequestParam("region") String region,
                                                                           @RequestParam("region-detail") String regionDetail) {
        List<ApiAladinItem> aladinResponse = searchBookService.getAladinItemByQuery(query, 5);
        Map<String, ApiAladinItem> isbnToAladinItemMap = aladinResponse.stream()
                .collect(Collectors.toMap(ApiAladinItem::getIsbn13, Function.identity()));

        List<OfflineLibrarySearchResult> result = new ArrayList<>();
        for (String isbn : isbnToAladinItemMap.keySet()) {
            List<AvailableLibrary> availableLibraryList = searchLibraryService.getAvailableLibrary(
                    isbn,
                    KoreaRegion.valueOf(region).getApiRegionCode(),
                    SeoulRegionDetail.valueOf(regionDetail).getApiRegionCode()
            );

            if (availableLibraryList.isEmpty()) continue;

            result.add(OfflineLibrarySearchResult.builder()
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

    @GetMapping("library/online")
    public List<OnlineLibrarySearchResult> getOnlineLibrarySearchResult(@RequestParam("query") String query,
                                                                        @RequestParam("include") List<String> includeList) {
        if (query.length() < 2) throw new BadRequestException("");
        if (includeList.size() == 0) throw new BadRequestException("");

        List<OnlineLibrarySearchResult> result = new ArrayList<>();

        if (includeList.contains("SEOUL_EDUCATION_LIBRARY"))
            result.addAll(searchLibraryService.getSeoulEducationLibrarySearchResult(query));
        if (includeList.contains("SEOUL_LIBRARY"))
            result.addAll(searchLibraryService.getSeoulLibrarySearchResult(query, 10));
        if (includeList.contains("NATIONAL_ASSEMBLY_LIBRARY"))
            result.addAll(searchLibraryService.getNationalAssemblyLibrary(query));

        return result;
    }

    @GetMapping("subscription")
    public List<SubscriptionSearchResult> getSubscriptionSearchResult(@RequestParam("query") String query,
                                                                      @RequestParam("include") List<String> includeList) {
        if (includeList.isEmpty()) throw new BadRequestException("include list cannot be empty");

        List<SubscriptionSearchResult> searchResultList = new ArrayList<>();

        if (includeList.contains("MILLIE"))
            searchResultList.addAll(searchSubscriptionService.getMilleSearchResult(query));
        if (includeList.contains("RIDI"))
            searchResultList.addAll(searchSubscriptionService.getRidiSearchResult(query));
        if (includeList.contains("YES24"))
            searchResultList.addAll(searchSubscriptionService.getYes24SearchResult(query));
        if (includeList.contains("KYOBO"))
            searchResultList.addAll(searchSubscriptionService.getKyoboSearchResult(query));

        return searchResultList;
    }

    // 교보분고, 알라딘, YES24
    @GetMapping("used")
    public UsedBookSearchResponse getUsedOnlineSearchResult(@RequestParam("query") String query,
                                                            @RequestParam(value = "include-online", required = false) List<String> includeOnlineList,
                                                            @RequestParam(value = "include-offline", required = false) List<String> includeOfflineList) {
        if (includeOnlineList == null && includeOfflineList == null) throw new BadRequestException("최소 1가지의 검색대상을 포함해 주세요");
        if (includeOnlineList == null) includeOfflineList = List.of();
        if (includeOfflineList == null) includeOfflineList = List.of();
        if (includeOnlineList.isEmpty() && includeOfflineList.isEmpty()) throw new BadRequestException("최소 1가지의 검색대상을 포함해 주세요");

        UsedBookSearchResponse result = new UsedBookSearchResponse();

        if (includeOnlineList.contains("ALADIN") || includeOfflineList.contains("ALADIN")) {
            List<ApiAladinItem> apiAladinItemList = searchUsedService.getAladinUsedBook(query);

            List<UsedBookSearchResult> aladinOnlineSearchResult = apiAladinItemList.stream()
                    .filter(item -> item.getSubInfo() != null && item.getSubInfo().getUsedList().getAladinUsed().getItemCount() != 0)
                    .map(item -> item.toUsedBookSearchResult(UsedBookProvider.ONLINE_ALADIN)).toList();

            List<UsedBookSearchResult> aladinOfflineSearchResult = apiAladinItemList.stream()
                    .filter(item -> item.getSubInfo() != null && item.getSubInfo().getUsedList().getSpaceUsed().getItemCount() != 0)
                    .map(item -> item.toUsedBookSearchResult(UsedBookProvider.OFFLINE_ALADIN)).toList();

            if (includeOnlineList.contains("ALADIN")) result.addOnlineList(aladinOnlineSearchResult);
            if (includeOfflineList.contains("ALADIN")) result.addOfflineList(aladinOfflineSearchResult);
        }

        if (includeOnlineList.contains("KYOBO"))
            result.addOnlineList(searchUsedService.getKyoboOnlineUsedBook(query));
        if (includeOnlineList.contains("INTERPARK"))
            result.addOnlineList(searchUsedService.getInterparkOnlineUsedBook(query));
        if (includeOnlineList.contains("YES24"))
            result.addOnlineList(searchUsedService.getYes24OnlineUsedBook(query));
        if (includeOfflineList.contains("YES24"))
            result.addOfflineList(searchUsedService.getYes24OfflineUsedBook(query));

        return result;
    }
}