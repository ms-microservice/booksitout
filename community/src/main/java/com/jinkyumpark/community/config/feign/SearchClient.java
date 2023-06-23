package com.jinkyumpark.community.config.feign;

import com.jinkyumpark.community.ranking.RankingResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(name = "search")
public interface SearchClient {

    @RequestMapping(method = RequestMethod.GET, value = "v4/search/popular/best-seller/aladin")
    List<RankingResponse> getBestSellerFromAladin();

}
