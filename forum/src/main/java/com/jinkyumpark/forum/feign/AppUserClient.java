package com.jinkyumpark.forum.feign;

import com.jinkyumpark.forum.feign.response.AppUserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "appUser", url = "http://localhost")
public interface AppUserClient {

    @RequestMapping(method = RequestMethod.GET, value = "v4/user/{appUserId}")
    AppUserInfo getUserInfoByUserId(@PathVariable("appUserId") Long userId);

}