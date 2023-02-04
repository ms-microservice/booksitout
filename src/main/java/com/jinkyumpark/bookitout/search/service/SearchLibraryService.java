package com.jinkyumpark.bookitout.search.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.availableLibrary.AvailableLibraryLibsLib;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.availableLibrary.AvailableLibraryResponse;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.hasbook.HasBookResponse;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn.NationalLibraryPublicApiBookSearchResponse;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn.LibrarySearchDoc;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn.LibrarySearchResponse;
import com.jinkyumpark.bookitout.search.provider.OnlineLibraryProvider;
import com.jinkyumpark.bookitout.search.response.library.*;
import com.jinkyumpark.bookitout.search.response.searchResult.OnlineLibrarySearchResult;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.*;

@Service
public class SearchLibraryService {
    private final RestTemplate restTemplate;
    private final Environment environment;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public SearchLibraryService(RestTemplate restTemplate, Environment environment, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.environment = environment;
        this.objectMapper = objectMapper;
        this.webClient = WebClient.builder().build();
    }

    public List<AvailableLibrary> getAvailableLibrary(String isbn, Integer regionCode, Integer regionDetailCode) {
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

    public List<NationalLibraryPublicApiBookSearchResponse> getBookFromNationalLibraryPublicApiByQuery(String query) {
        String url = String.format("%s?authKey=%s&keyword=%s&format=json&pageSize=10",
                environment.getProperty("search.data4library.search.url"), environment.getProperty("search.data4library.api-key"), query);

        LibrarySearchResponse response = restTemplate.getForObject(url, LibrarySearchResponse.class);

        return response.getResponse().getDocs().stream()
                .map(LibrarySearchDoc::getDoc)
                .toList();
    }

    public List<OfflineLibraryAvailableSearchResult> getBookAvailabilityStatusFromNationalLibraryPublicApi(List<Integer> libraryCodeList,
                                                                                                           List<String> isbnList) {
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

            System.out.println(document);

            Element ulElement = document.getElementsByClass("bbs_webzine elib").first();
            if (ulElement == null) return List.of();

            Elements liElementsList = ulElement.getElementsByTag("li");
            for (Element liElement : liElementsList) {
                Element titleElement = liElement.getElementsByTag("b").first();
                String title = titleElement != null ? titleElement.text() : "";

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

    public List<OnlineLibrarySearchResult> getSeoulLibrarySearchResult(String query) {
        return List.of();
    }

    public List<OnlineLibrarySearchResult> getNationalAssemblyLibrary(String query) {
        return List.of();
    }
}