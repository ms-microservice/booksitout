package com.jinkyumpark.community.config.feign;

import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "appUser", url = "${feign.url.auth}")
public interface UserClient {

    @RequestMapping(method = RequestMethod.GET, value = "v4/user/{appUserId}")
    AppUserInfo getUserInfoByUserId(@PathVariable("appUserId") Long userId);

    @RequestMapping(method = RequestMethod.GET, value = "v4/user/public-user/by-name")
    AppUserInfo getUserByNickname(@RequestParam("name") String nickName);

    @RequestMapping(method = RequestMethod.GET, value = "v4/user/public-user/{appUserId}")
    AppUserInfo getPublicUserByAppUserId(@PathVariable("appUserId") Long appUserId);

}