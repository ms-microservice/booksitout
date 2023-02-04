package com.jinkyumpark.bookitout.search.service;

import com.jinkyumpark.bookitout.search.apiResponse.aladin.ApiAladinItem;
import com.jinkyumpark.bookitout.search.apiResponse.aladin.ApiAladinResponse;
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

    public List<ApiAladinItem> getAladinItemByQuery(String query, int size) {
        String requestUrl = String.format("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=%s&Query=%s&Output=JS&version=20131101&MaxResults=%s",
                environment.getProperty("search.aladin.api-key"), query, size);

        ApiAladinResponse response = restTemplate.getForObject(requestUrl, ApiAladinResponse.class);

        if (response == null) return List.of();

        return response.getItem();
    }
}