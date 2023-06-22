package com.jinkyumpark.core.common.feign;

import com.jinkyumpark.core.common.feign.response.PublicUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user")
public interface UserClient {

    @RequestMapping(method = RequestMethod.GET, value = "v4/user/public-user/by-name")
    PublicUserResponse getPublicUserByNickname(@RequestParam("name") String nickName);

}
