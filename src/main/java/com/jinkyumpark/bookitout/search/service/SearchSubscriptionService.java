package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.mille.ApiMillieBook;
import com.jinkyumpark.bookitout.search.apiResponse.mille.ApiMillieResponse;
import com.jinkyumpark.bookitout.search.apiResponse.ridi.ApiRidiBook;
import com.jinkyumpark.bookitout.search.apiResponse.ridi.ApiRidiResponse;
import com.jinkyumpark.bookitout.search.response.searchResult.SubscriptionSearchResult;
import com.jinkyumpark.bookitout.search.provider.SubscriptionProvider;
import lombok.RequiredArgsConstructor;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchSubscriptionService {
    private final RestTemplate restTemplate;

    public List<SubscriptionSearchResult> getYes24SearchResult(String query) {
        String url = String.format("https://bookclub.yes24.com/BookClub/Search?query=%s", query);
        List<SubscriptionSearchResult> resultList = new ArrayList<>();

        Document document = SearchService.getJsoupDocument(url);
        Element element = document.getElementById("yesSchList");
        if (element == null) return List.of();
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

    public List<SubscriptionSearchResult> getMilleSearchResult(String query) {
        String url = String.format("https://live-api.millie.co.kr/v2/search/content?debug=1&searchType=content&keyword=%s&contentlimitCount=5&postlimitCount=0&librarylimitCount=0&startPage=1", query);
        ApiMillieResponse millieResponse = restTemplate.getForObject(url, ApiMillieResponse.class);

        if (millieResponse == null) return List.of();
        if (millieResponse.getRespData() == null) return List.of();

        List<ApiMillieBook> bookList = millieResponse.getRespData().getList();
        return bookList.stream()
                .map(ApiMillieBook::toSubscriptionSearchResult)
                .toList();
    }

    public List<SubscriptionSearchResult> getRidiSearchResult(String query) {
        String url = String.format("https://search-api.ridibooks.com/search?site=ridi-select&where=book&what=instant&keyword=%s", query);

        ApiRidiResponse ridiResponse = restTemplate.getForObject(url, ApiRidiResponse.class);

        if (ridiResponse == null) return List.of();
        if (ridiResponse.getBooks().size() == 0) return List.of();

        return ridiResponse.getBooks().stream()
                .map(ApiRidiBook::toSubscriptionSearchResult)
                .toList();
    }

    public List<SubscriptionSearchResult> getKyoboSearchResult(String query) {
        String url = String.format("https://search.kyobobook.co.kr/search?keyword=%s&target=sam&gbCode=TOT&cat1=eBook@SAM", query);

        Document document = SearchService.getJsoupDocument(url);
        Elements productList = document.getElementsByClass("prod_item");

        List<SubscriptionSearchResult> subscriptionSearchResults = new ArrayList<>();
        for (Element product : productList) {
            Elements bookIdElements = product.getElementsByTag("input");
            Element bookIdElement = bookIdElements.first();
            String bookId = bookIdElement != null ? bookIdElement.attr("data-bid") : null;

            if (bookId == null) continue;

            Element titleElement = product.getElementsByClass("prod_info").first();
            String title = titleElement != null ? titleElement.getElementsByTag("span").last().text() : "?";

            Element authorElement = product.getElementsByClass("author").first();
            String author = authorElement != null ? authorElement.text() : "?";

            Element linkElement = product.getElementsByClass("btn_sm btn_light_gray").first();
            String link = linkElement != null ? linkElement.attr("href") : "";

            subscriptionSearchResults.add(SubscriptionSearchResult.builder()
                    .title(title)
                    .author(author)
                    .cover(String.format("https://contents.kyobobook.co.kr/pdt/%s.jpg", bookId))
                    .link(link)
                    .provider(SubscriptionProvider.KYOBO).build());
        }

        return subscriptionSearchResults.stream().limit(5).toList();
    }
}
