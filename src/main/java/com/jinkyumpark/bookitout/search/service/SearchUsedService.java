package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinItem;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinResponse;
import com.jinkyumpark.bookitout.search.apiResponse.kyobo.KyoboUsedBook;
import com.jinkyumpark.bookitout.search.apiResponse.yes24.Yes24UsedBook;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchUsedService {
    private final RestTemplate restTemplate;
    private final Environment environment;

    public List<AladinItem> getAladinUsedBook(String query) {
        String url = String.format("%s?TTBKey=%s&Query=%s&SearchTarget=USED&outofStockfilter=1&Output=JS&OptResult=usedList&version=20131101",
                environment.getProperty("search.aladin.url"), environment.getProperty("search.aladin.api-key"), query);
        AladinResponse response = restTemplate.getForObject(url, AladinResponse.class);

        if (response == null) return List.of();
        return response.getItem();
    }

    public List<KyoboUsedBook> getKyoboUsedBook(String query) {
        String url = String.format("%s?keyword=%s&target=used",
                environment.getProperty("search.kyobo.url"), query);

        return List.of();
    }

    public List<Yes24UsedBook> getYes24UsedBook(String query) {
        String url = String.format("%s?domain=STORE&query=%s",
                environment.getProperty("search.yes24.url"), query);

        return List.of();
    }
}
