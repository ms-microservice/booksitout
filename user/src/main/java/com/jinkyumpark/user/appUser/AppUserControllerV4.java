package com.jinkyumpark.user.appUser;

import com.jinkyumpark.user.appUser.dto.AppUserInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("v4/user")
@RestController
public class AppUserControllerV4 {

    private final AppUserService appUserService;

    @GetMapping("{appUserId}")
    public AppUserInfoDto getAppUserProfileByAppUserId(@PathVariable("appUserId") Long appUserId) {
        AppUser appUser = appUserService.getAppUserById(appUserId);

        return AppUserInfoDto.of(appUser);
    }

}
