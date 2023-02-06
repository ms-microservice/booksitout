package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.data4library.availableLibrary.AvailableLibraryLibsLib;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.availableLibrary.AvailableLibraryResponse;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.hasbook.HasBookResponse;
import com.jinkyumpark.bookitout.search.apiResponse.seoulLibrary.ApiSeoulLibraryBook;
import com.jinkyumpark.bookitout.search.apiResponse.seoulLibrary.ApiSeoulLibraryResponse;
import com.jinkyumpark.bookitout.search.provider.OnlineLibraryProvider;
import com.jinkyumpark.bookitout.search.response.library.*;
import com.jinkyumpark.bookitout.search.response.searchResult.OnlineLibrarySearchResult;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class SearchLibraryService {
    private final RestTemplate restTemplate;
    private final Environment environment;

    public List<AvailableLibrary> getAvailableLibraryByRegion(String isbn, Integer regionCode, Integer regionDetailCode) {
        String url = String.format("http://data4library.kr/api/libSrchByBook?authKey=%s&isbn=%s&region=%s&format=JS%s",
                environment.getProperty("search.data4library.api-key"),
                isbn, regionCode,
                regionDetailCode == null ? "" : "&dtl_region=" + regionDetailCode);

        AvailableLibraryResponse response = restTemplate.getForObject(url, AvailableLibraryResponse.class);

        return response.getResponse().getLibs().stream()
                .map(AvailableLibraryLibsLib::getLib)
                .map(l -> AvailableLibrary.builder()
                        .code(l.getLibCode())
                        .name(l.getLibName())
                        .address(l.getAddress())
                        .libraryLink(l.getHomepage())
                        .build())
                .toList();
    }

    public List<OfflineLibraryAvailableSearchResult> getBookAvailabilityByLibrary(List<Integer> libraryCodeList, List<String> isbnList) {
        List<OfflineLibraryAvailableSearchResult> resultList = new ArrayList<>();
        for (Integer libraryCode : libraryCodeList) {
            for (String isbn : isbnList) {
                String url = String.format("%s?authKey=%s&libCode=%s&isbn13=%s&format=JS",
                        environment.getProperty("search.data4library.has-book.url"), environment.getProperty("search.data4library.api-key"),
                        libraryCode, isbn);

                HasBookResponse response = restTemplate.getForObject(url, HasBookResponse.class);

                if (response.getResponse().getResult().getHasBook().equals("Y")) {
                    resultList.add(OfflineLibraryAvailableSearchResult.builder()
                            .isbn(isbn)
                            .libraryCode(libraryCode)
                            .isLoanPossible(response.getResponse().getResult().getLoanAvailable().equals("Y"))
                            .build());
                }
            }
        }
        return resultList;
    }

    public List<OnlineLibrarySearchResult> getSeoulLibrarySearchResult(String query, int limit) {
        String url = String.format("https://elib.seoul.go.kr/api/contents/search?searchKeyword=%s&sortOption=1&contentType=EB&innerSearchYN=N&innerKeyword=&libCode=&currentCount=1&pageCount=%s&_=1675593987342", query, limit);

        ApiSeoulLibraryResponse response = restTemplate.getForObject(url, ApiSeoulLibraryResponse.class);

        if (response == null) return List.of();
        if (response.getBookList() == null || response.getBookList().size() == 0) return List.of();

        return response.getBookList().stream()
                .map(ApiSeoulLibraryBook::toOnlineLibrarySearchResult)
                .toList();
    }

    public List<OnlineLibrarySearchResult> getSeoulEducationLibrarySearchResult(String query) {
        String url = "https://e-lib.sen.go.kr/wsearch/search_result.php";

        List<OnlineLibrarySearchResult> result = new ArrayList<>();
        try {
            Document document = Jsoup.connect(url).data(Map.of(
//                    "type", "",
                    "startCount", "0",
                    "sort", "RANK",
                    "collection", "ALL",
                    "range", "A",
                    "startDate", "",
                    "endDate", "",
                    "searchField", "ALL",
                    "realQuery", "",
                    "reQuery", "",
//                    "categoryQuery": "",
//                    "viewQuery": "",
                    "query", "스프링"
            )).post();

            Element ulElement = document.getElementsByClass("bbs_webzine elib").first();
            if (ulElement == null) return List.of();

            Elements liElementsList = ulElement.getElementsByTag("li");
            for (Element liElement : liElementsList) {
                Element titleElement = liElement.getElementsByTag("b").first();
                String title = titleElement != null ? titleElement.text() : "";

                if (title.equals("")) continue;

                Element authorElement = liElement.getElementsByClass("info-elib").first();
                String author = authorElement != null ? authorElement.getElementsByTag("span").first().text() : "";

                Element coverElement = liElement.getElementsByTag("img").first();
                String cover = coverElement != null ? coverElement.attr("src") : "";

                Element linkElement = liElement.getElementsByTag("a").first();
                String link = linkElement != null ? linkElement.attr("href") : "";

                Element loanPossibleElement = liElement.getElementsByClass("meta").first();
                Boolean loanPossible = loanPossibleElement != null ? loanPossibleElement.getElementsByTag("span").get(8).text().equals("대출가능") : null;

                Element reservationPossibleElement = liElement.getElementsByClass("meta").first();
                Boolean reservationPossible = reservationPossibleElement != null ? !reservationPossibleElement.getElementsByTag("span").get(10).text().equals("예약불가") : null;

                result.add(OnlineLibrarySearchResult.builder()
                        .title(title)
                        .author(author)
                        .cover(cover)
                        .link(link)
                        .loanPossible(loanPossible)
                        .reservationPossible(reservationPossible)
                        .provider(OnlineLibraryProvider.SEOUL_EDUCATION_LIBRARY)
                        .build()
                );
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return result;
    }

    public List<OnlineLibrarySearchResult> getNationalAssemblyLibrary(String query) {
        String url = String.format("https://dl.nanet.go.kr/search/searchInnerList.do?queryText=%s:ALL_NI_TOC:AND&searchMehtod=F&topSubMenuCode=EBOK", query);

        Document document = SearchService.getJsoupDocument(url);
        Element listElement = document.getElementsByClass("searchList").first().getElementsByClass("list").first();
        if (listElement == null) return List.of();

        List<OnlineLibrarySearchResult> resultList = new ArrayList<>();
        Elements bookList = listElement.getElementsByTag("li");
        for (Element book : bookList) {
            String title = book.getElementsByTag("a").first().text();
            String author = "";
            String cover = "";

            String bookId = book.getElementsByTag("input").first().attr("value");
            String link = String.format(
                    "https://dl.nanet.go.kr/search/searchInnerDetail.do?searchType=INNER_SEARCH&resultType=INNER_SEARCH_DETAIL&searchMehtod=L&searchClass=S&controlNo=%s&prevQueryText=%s:ALL_NI_TOC:AND&topMainMenuCode=MONO_ALL&topSubMenuCode=EBOK&totalSize=3910&totalSizeByMenu=4&hanjaYn=Y",
                    bookId, query);

            Boolean loanPossible = true;
            Boolean reservationPossible = false;

            resultList.add(OnlineLibrarySearchResult.builder()
                    .title(title)
                    .author(author)
                    .cover(cover)
                    .link(link)
                    .loanPossible(loanPossible)
                    .reservationPossible(reservationPossible)
                    .provider(OnlineLibraryProvider.NATIONAL_ASSEMBLY_LIBRARY).build());
        }


        return List.of();
    }

    public List<OnlineLibrarySearchResult> getGyeonggiEducationLibrary(String query) {
        String url = String.format("https://lib.goe.go.kr/gg/intro/search/index.do?menu_idx=10&viewPage=1&book_list=&title=%s&author=&publer=&keyword=&booktype=BOOK&shelfCode=&libraryCodes=MA&_libraryCodes=on&sortField=NONE&sortType=ASC&rowCount=10#search_result", query);

        Document document = SearchService.getJsoupDocument(url);

        Element bookListElement = document.getElementsByClass("imageType").first();
        if (bookListElement == null) return List.of();

        Elements bookList = bookListElement.getElementsByClass("row");
        List<OnlineLibrarySearchResult> resultList = new ArrayList<>();
        for (Element book : bookList) {
            String title = book.getElementsByClass("book-title").first().getElementsByTag("span").text();

            String bookInfoText = book.getElementsByClass("book-status-info").first().text();
            String author = bookInfoText.substring(5, bookInfoText.indexOf('|'));

            String cover = book.getElementsByTag("img").first().attr("src");
            String link = book.getElementsByClass("book-title").first().attr("href");

            Boolean loanPossible = book.getElementsByClass("state typeC").first().text().equals("대출가능");
            Boolean reservationPossible = !book.getElementsByClass("state typeC").first().text().equals("예약불가");

            resultList.add(OnlineLibrarySearchResult.builder()
                    .title(title)
                    .author(author)
                    .cover(cover)
                    .link("https://lib.goe.go.kr/gg/intro/search/" + link)
                    .loanPossible(loanPossible)
                    .reservationPossible(reservationPossible)
                    .provider(OnlineLibraryProvider.GYEONGGI_EDUCATION_LIBRARY).build());
        }

        return resultList;
    }

    public List<OnlineLibrarySearchResult> getGwanghwamunLibrary(String query) {
        String url = String.format("http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_List.asp?keyword=%s&sortType=3", query);

        Document document = SearchService.getJsoupDocument(url);
        Element bookListElements = document.getElementsByClass("bookListType01").first();
        if (bookListElements == null) return List.of();

        Elements bookList = bookListElements.getElementsByTag("li");

        List<OnlineLibrarySearchResult> resultList = new ArrayList<>();
        for (Element book : bookList) {
            String title = book.getElementsByClass("tit").first().text();
            String author = book.getElementsByClass("writer").first().text();
            String cover = book.getElementsByClass("thum").first().getElementsByTag("img").first().attr("src");

            String bookId = book.getElementsByClass("btn").first().getElementsByTag("input").attr("barcode");
            String link = String.format("http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_Detail.asp?barcode=%s&type=&product_cd=001&adult_yn=N", bookId);

            int currentLoanCount = Integer.parseInt(book.getElementsByClass("out").first().getElementsByTag("span").get(1).text());
            int maxLoanCount = Integer.parseInt(book.getElementsByClass("out").first().getElementsByTag("span").get(2).text());

            resultList.add(OnlineLibrarySearchResult.builder()
                    .title(title)
                    .author(author)
                    .cover(cover)
                    .link(link)
                    .loanPossible(currentLoanCount < maxLoanCount)
                    .reservationPossible(true)
                    .provider(OnlineLibraryProvider.GWANGHWAMUN_LIBRARY).build());
        }

        return resultList;
    }

    public List<OnlineLibrarySearchResult> getSeoulCongressLibrary(String query) {
        String url = "";

        return List.of();
    }
}