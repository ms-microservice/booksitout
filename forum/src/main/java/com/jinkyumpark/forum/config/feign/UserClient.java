package com.jinkyumpark.forum.config.feign;

import com.jinkyumpark.forum.config.feign.response.AppUserInfo;
import com.jinkyumpark.forum.config.feign.response.PublicUserResponse;
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
    PublicUserResponse getUserByNickname(@RequestParam("name") String nickName);

}