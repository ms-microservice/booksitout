package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinItem;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.AladinResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchBookService {
    private final RestTemplate restTemplate;
    private final Environment environment;

    public List<AladinItem> getAladinItemByQuery(String query, int size) {
        String requestUrl = String.format("%s?TTBKey=%s&Query=%s&Output=JS&version=20131101&MaxResults=%s",
                environment.getProperty("search.aladin.url"), environment.getProperty("search.aladin.api-key"), query, size);

        AladinResponse response = restTemplate.getForObject(requestUrl, AladinResponse.class);

        if (response == null) return List.of();

        return response.getItem();
    }
}