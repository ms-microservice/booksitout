package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.aladin.ApiAladinItem;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.ApiAladinResponse;
import com.jinkyumpark.bookitout.search.provider.UsedBookProvider;
import com.jinkyumpark.bookitout.search.response.searchResult.UsedBookSearchResult;
import lombok.RequiredArgsConstructor;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchUsedService {
    private final RestTemplate restTemplate;
    private final Environment environment;

    public List<ApiAladinItem> getAladinUsedBook(String query) {
        String url = String.format("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=%s&Query=%s&SearchTarget=USED&outofStockfilter=1&Output=JS&OptResult=usedList&version=20131101",
                environment.getProperty("search.aladin.api-key"), query);
        ApiAladinResponse response = restTemplate.getForObject(url, ApiAladinResponse.class);

        if (response == null) return List.of();
        return response.getItem();
    }

    public List<UsedBookSearchResult> getKyoboOnlineUsedBook(String query) {
        String url = String.format("https://search.kyobobook.co.kr/search?keyword=%s&gbCode=TOT&target=used", query);

        return List.of();
    }

    public List<UsedBookSearchResult> getYes24OfflineUsedBook(String query) {
        String url = String.format("http://www.yes24.com/product/search?domain=STORE&query=%s&page=1&size=10&dispNo1=001", query);

        Document document = SearchService.getJsoupDocument(url);
        Element element = document.getElementById("yesSchList");
        if (element == null) return List.of();
        Elements listElements = element.getElementsByTag("li");

        List<UsedBookSearchResult> usedBookSearchResultList = new ArrayList<>();
        for (Element listElement : listElements) {
            String cover = listElement.getElementsByTag("img").first().attr("data-original");
            String title = listElement.getElementsByClass("gd_name").first().text();
            String author = listElement.getElementsByClass("info_auth").first().getElementsByTag("a").first().text();
            String minPrice = listElement.getElementsByClass("txt_num").first().text().replace(",", "").replace("원", "");
            String stockCount = listElement.getElementsByClass("txC_blue").first().text().substring(3, 4);

            List<String> locationList = new ArrayList<>();
            Elements locationElements = listElement.getElementsByClass("loca");
            for (Element locationElement : locationElements) {
                String location = locationElement.getElementsByTag("strong").first().text();
                locationList.add(location);
            }

            UsedBookSearchResult result = UsedBookSearchResult.builder()
                    .provider(UsedBookProvider.OFFLINE_YES24)
                    .title(title)
                    .author(author)
                    .cover(cover)
                    .link(url)
                    .stockCount(Integer.parseInt(stockCount))
                    .minPrice(Integer.parseInt(minPrice))
                    .locationList(locationList).build();

            usedBookSearchResultList.add(result);
        }

        return usedBookSearchResultList;
    }

    public List<UsedBookSearchResult> getInterparkOnlineUsedBook(String query) {
        return List.of();
    }

    public List<UsedBookSearchResult> getYes24OnlineUsedBook(String query) {
        return List.of();
    }
}
