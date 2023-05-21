package com.jinkyumpark.user.publicUser;

import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.appUser.AppUserService;
import com.jinkyumpark.user.loginUser.LoginUser;
import com.jinkyumpark.user.loginUser.User;
import com.jinkyumpark.user.publicUser.dto.PublicUser;
import com.jinkyumpark.user.utils.s3.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor

@RequestMapping("v4/user/public-user")
@RestController
public class PublicUserControllerV4 {

    private final AppUserService appUserService;
    private final PublicUserService publicUserService;
    private final S3Service s3Service;

    @GetMapping("{appUserId}")
    public PublicUser getPublicUserByAppUserId(@PathVariable("appUserId") Long appUserId) {
        AppUser appUser = appUserService.getAppUserByAppUserId(appUserId);

        return PublicUser.of(appUser);
    }

    @GetMapping("by-name")
    public PublicUser getPublicUserByNickname(@RequestParam("name") String publicName) {
        return publicUserService.getPublicUserByPublicName(publicName);
    }

    @SneakyThrows
    @PutMapping
    public UpdateSuccessResponse editPublicUser(@LoginUser User loginUser,
                                                @RequestParam(value = "file", required = false) MultipartFile multipartFile,
                                                @RequestParam(value = "name", required = false) String name) {
        String imageUrl = null;
        if (multipartFile != null) {
                String fileName = UUID.randomUUID().toString().substring(0, 10);
                imageUrl = s3Service.uploadFile(fileName, "profile-image", multipartFile.getInputStream().readAllBytes());
        }

        PublicUser publicUser = PublicUser.builder()
                .appUserId(loginUser.getId())
                .name(name)
                .profileImage(imageUrl)
                .build();

        PublicUser updatedPublicUser = publicUserService.updatePublicUser(publicUser);

        return UpdateSuccessResponse.builder()
                .updated(updatedPublicUser)
                .build();
    }

}
