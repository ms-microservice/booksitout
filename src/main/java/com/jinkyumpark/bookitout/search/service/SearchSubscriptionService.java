package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.response.SubscriptionSearchResult;
import com.jinkyumpark.bookitout.search.response.subscription.SubscriptionProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SearchSubscriptionService {

    private final Environment environment;

    public List<SubscriptionSearchResult> getMilleSearchResult(String query) {
        String url = String.format("https://www.millie.co.kr/v3/search/result/%s?type=total&contentcode=0&searchBack=y&nav_hidden=y&category=1&order=popular", query);

        try {
            Document document = Jsoup.connect(url).get();
            System.out.println(document);
        } catch (Exception e) {
            log.info(e.getMessage());
        }

        return List.of();
    }

    public List<SubscriptionSearchResult> getRidiSearchResult(String query) {
        String url = String.format("https://select.ridibooks.com/search?q=%s&type=Books", query);

        try {
            Document document = Jsoup.connect(url).get();
            System.out.println(document);
        } catch (Exception e) {
            log.info(e.getMessage());
        }

        return List.of();
    }

    public List<SubscriptionSearchResult> getYes24SearchResult(String query) {
        String url = String.format("https://bookclub.yes24.com/BookClub/Search?query=%s", query);
        List<SubscriptionSearchResult> resultList = new ArrayList<>();

        Document document = null;
        try {
            document = Jsoup.connect(url).get();
        } catch (IOException e) {
            log.info(e.getMessage());
        }

        Element element = document.getElementById("yesSchList");
        Elements listElements = element.getElementsByTag("li");

        for (Element listElement : listElements) {
            Element titleLinkElement = listElement.getElementsByClass("gd_name").first();
            String title = titleLinkElement != null ? titleLinkElement.text() : null;
            String link = titleLinkElement != null ? titleLinkElement.attr("href") : null;

            Element authorElement = listElement.getElementsByClass("info_auth").first();
            String author = authorElement != null ? authorElement.text().trim() : null;

            Element coverElement = listElement.getElementsByClass("lazy").first();
            String cover = coverElement != null ? coverElement.attr("data-original") : null;

            resultList.add(SubscriptionSearchResult.builder()
                    .title(title)
                    .author(author)
                    .cover(cover)
                    .link("https://bookclub.yes24.com" + link)
                    .provider(SubscriptionProvider.YES24).build());
        }

        return resultList;
    }
}
