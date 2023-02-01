package com.jinkyumpark.bookitout.search;

import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinItem;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinResponse;
import com.jinkyumpark.bookitout.search.apiResponse.library.offline.availableLibrary.AvailableLibraryLibsLib;
import com.jinkyumpark.bookitout.search.apiResponse.library.offline.availableLibrary.AvailableLibraryResponse;
import com.jinkyumpark.bookitout.search.apiResponse.library.offline.hasbook.HasBookResponse;
import com.jinkyumpark.bookitout.search.apiResponse.library.offline.isbn.NationalLibraryPublicApiBookSearchResponse;
import com.jinkyumpark.bookitout.search.apiResponse.library.offline.isbn.LibrarySearchDoc;
import com.jinkyumpark.bookitout.search.apiResponse.library.offline.isbn.LibrarySearchResponse;
import com.jinkyumpark.bookitout.search.response.library.AvailableLibrary;
import com.jinkyumpark.bookitout.search.response.library.OfflineLibraryAvailableSearchResult;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final RestTemplate restTemplate;
    private final Environment environment;

    public List<NationalLibraryPublicApiBookSearchResponse> getBookFromNationalLibraryPublicApiByQuery(String query) {
        String url = String.format("%s?authKey=%s&keyword=%s&format=json&pageSize=10",
                environment.getProperty("search.library.search.url"), environment.getProperty("search.library.api-key"), query);

        LibrarySearchResponse response = restTemplate.getForObject(url, LibrarySearchResponse.class);

        return response.getResponse().getDocs().stream()
                .map(LibrarySearchDoc::getDoc)
                .toList();
    }

    public List<OfflineLibraryAvailableSearchResult> getBookAvailabilityStatusFromNationalLibraryPublicApi(List<Integer> libraryCodeList, List<String> isbnList) {
        List<OfflineLibraryAvailableSearchResult> resultList = new ArrayList<>();
        for (Integer libraryCode : libraryCodeList) {
            for (String isbn : isbnList) {
                String url = String.format("%s?authKey=%s&libCode=%s&isbn13=%s&format=JS",
                        environment.getProperty("search.library.has-book.url"), environment.getProperty("search.library.api-key"),
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

    public List<AvailableLibrary> getAvailableLibrary(String isbn, Integer regionCode, Integer regionDetailCode) {

        String url = String.format("%s?authKey=%s&isbn=%s&region=%s&format=JS%s",
                environment.getProperty("search.library.has-book-by-isbn.url"), environment.getProperty("search.library.api-key"),
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

    public List<AladinItem> getAladinItemByQuery(String query, int size) {

        String requestUrl = String.format("%s?TTBKey=%s&Query=%s&Output=JS&version=20131101&MaxResults=%s",
                environment.getProperty("search.aladin.url"), environment.getProperty("search.aladin.api-key"), query, size);

        AladinResponse response = restTemplate.getForObject(requestUrl, AladinResponse.class);

        return response.getItem();
    }
}