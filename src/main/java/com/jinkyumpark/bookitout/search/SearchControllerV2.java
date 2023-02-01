package com.jinkyumpark.bookitout.search;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinItem;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinResponse;
import com.jinkyumpark.bookitout.search.request.KoreanRegion;
import com.jinkyumpark.bookitout.search.request.SeoulRegionDetail;
import com.jinkyumpark.bookitout.search.response.*;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.common.exception.http.BadRequestException;
import com.jinkyumpark.bookitout.search.response.library.*;
import com.jinkyumpark.bookitout.search.response.used.UsedBookProvider;
import com.jinkyumpark.bookitout.search.response.used.UsedBookSearchResult;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.user.login.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@RestController
@RequestMapping("v2/search")
public class SearchControllerV2 {
    private final BookService bookService;
    private final SearchService searchService;

    private final RestTemplate restTemplate;
    private final Environment environment;

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

        List<AladinItem> aladinResponse = searchService.getAladinItemByQuery(query, 5);
        Map<String, AladinItem> isbnToAladinItemMap = aladinResponse.stream()
                .collect(Collectors.toMap(AladinItem::getIsbn13, Function.identity()));

        List<OfflineLibrarySearchResultV2> result = new ArrayList<>();
        for (String isbn : isbnToAladinItemMap.keySet()) {
            List<AvailableLibrary> availableLibraryList = searchService.getAvailableLibrary(
                    isbn,
                    KoreanRegion.valueOf(region).getApiRegionCode(),
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
    public List<OfflineLibrarySearchResultV2> getOnlineLibrarySearchResult(@RequestParam("query") String query) {
        return null;
    }

    @GetMapping("subscription")
    public List<SubscriptionSearchResult> getSubscriptionSearchResult(@RequestParam("query") String query) {
        return null;
    }

    // 교보분고, 알라딘, YES24,
    @GetMapping("used")
    public Map<String, List<UsedBookSearchResult>> getUsedOnlineSearchResult(@RequestParam("query") String query,
                                                                             @RequestParam("include") List<String> includeList) {
        if (includeList.isEmpty()) throw new BadRequestException("최소 1가지의 검색대상을 포함해 주세요");

        Map<String, List<UsedBookSearchResult>> map = new HashMap<>((Map.of("online", List.of(), "offline", List.of())));

        if (includeList.contains("ALADIN")) {
            String searchTarget = "USED";
            String outOfStockFilter = "1";
            String optResult = "usedList";
            String version = "20131101";

            String requestUrl = String.format("%s?TTBKey=%s&Query=%s&SearchTarget=%s&outofStockfilter=%s&Output=JS&OptResult=%s&version=%s",
                    environment.getProperty("search.aladin.url"), environment.getProperty("search.aladin.api-key"), query,
                    searchTarget, outOfStockFilter, optResult, version);

            AladinResponse aladinSearchResult = restTemplate.getForObject(requestUrl, AladinResponse.class);

            List<UsedBookSearchResult> aladinOnlineSearchResult = aladinSearchResult.getItem().stream()
                    .filter(item -> item.getSubInfo() != null && item.getSubInfo().getUsedList().getAladinUsed().getItemCount() != 0)
                    .map(item -> UsedBookSearchResult.builder()
                            .provider(UsedBookProvider.ONLINE_ALADIN)
                            .title(item.getTitle())
                            .author(item.getAuthor())
                            .cover(item.getCover())
                            .stockCount(item.getSubInfo().getUsedList().getAladinUsed().getItemCount())
                            .minPrice(item.getSubInfo().getUsedList().getAladinUsed().getMinPrice())
                            .link(item.getSubInfo().getUsedList().getAladinUsed().getLink().replaceAll("amp;", ""))
                            .build())
                    .toList();

            List<UsedBookSearchResult> aladinOfflineSearchResult = aladinSearchResult.getItem().stream()
                    .filter(item -> item.getSubInfo() != null && item.getSubInfo().getUsedList().getSpaceUsed().getItemCount() != 0)
                    .map(item -> UsedBookSearchResult.builder()
                            .provider(UsedBookProvider.OFFLINE_ALADIN)
                            .title(item.getTitle())
                            .author(item.getAuthor())
                            .cover(item.getCover())
                            .stockCount(item.getSubInfo().getUsedList().getSpaceUsed().getItemCount())
                            .minPrice(item.getSubInfo().getUsedList().getSpaceUsed().getMinPrice())
                            .link(item.getSubInfo().getUsedList().getSpaceUsed().getLink().replaceAll("amp;", ""))
                            .build())
                    .toList();

            map.merge("online", aladinOnlineSearchResult, (a, b) -> Stream.concat(a.stream(), b.stream()).toList());
            map.merge("offline", aladinOfflineSearchResult, (a, b) -> Stream.concat(a.stream(), b.stream()).toList());
        }

        if (includeList.contains("KYOBO")) {

        }

        if (includeList.contains("YES24")) {

        }

        return map;
    }
}