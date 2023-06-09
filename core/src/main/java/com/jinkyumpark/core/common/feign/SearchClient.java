package com.jinkyumpark.core.common.feign;

import com.jinkyumpark.core.common.feign.response.BookDetailResponse;
import com.jinkyumpark.core.common.feign.response.NewBookSearchResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "searchNew", url = "${feign.url.search}")
public interface SearchClient {

    @RequestMapping(method = RequestMethod.GET, value = "v3/search/new/naver")
    List<NewBookSearchResponse> getNewBookSearchResultFromNaver(@RequestParam("query") String query);

    @RequestMapping(method = RequestMethod.GET, value = "v3/search/new/naver/isbn/{isbn}")
    NewBookSearchResponse getNewBookByIsbnFromNaver(@PathVariable("isbn") String isbn);

    @RequestMapping(method = RequestMethod.GET, value = "v4/search/by-isbn/data4library")
    BookDetailResponse getBookDetailByIsbnFromData4library(@RequestParam("isbn") Long isbn);

}
