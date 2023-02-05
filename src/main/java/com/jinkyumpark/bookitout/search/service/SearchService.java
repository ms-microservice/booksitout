package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn.LibrarySearchDoc;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn.LibrarySearchResponse;
import com.jinkyumpark.bookitout.search.apiResponse.data4library.isbn.NationalLibraryPublicApiBookSearchResponse;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.parser.Parser;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final RestTemplate restTemplate;
    private final Environment environment;

    static Document getJsoupDocument(String url) {
        Document document = null;
        try {
            document = Jsoup.connect(url).parser(Parser.htmlParser()).get();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return document;
    }

    public List<NationalLibraryPublicApiBookSearchResponse> getBookFromNationalLibraryPublicApiByQuery(String query) {
        String url = String.format("%s?authKey=%s&keyword=%s&format=json&pageSize=10",
                environment.getProperty("search.data4library.search.url"), environment.getProperty("search.data4library.api-key"), query);

        LibrarySearchResponse response = restTemplate.getForObject(url, LibrarySearchResponse.class);

        return response.getResponse().getDocs().stream()
                .map(LibrarySearchDoc::getDoc)
                .toList();
    }
}
