package com.jinkyumpark.library.common.feign.client;

import com.jinkyumpark.library.common.feign.response.AppUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "userClient", url = "${feign.url.user}")
public interface UserClient {

    @RequestMapping(method = RequestMethod.GET, value = "/v4/user/{appUserId}")
    AppUserResponse getAppUserById(@PathVariable("appUserId") Long appUserId);

}
