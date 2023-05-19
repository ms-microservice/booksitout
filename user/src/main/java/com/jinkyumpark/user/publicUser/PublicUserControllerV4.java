package com.jinkyumpark.user.publicUser;

import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.appUser.AppUserService;
import com.jinkyumpark.user.publicUser.dto.PublicUserEditRequest;
import com.jinkyumpark.user.publicUser.dto.PublicUserResponse;
import com.jinkyumpark.user.utils.s3.S3Service;
import com.jinkyumpark.user.utils.s3.S3UploadSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.util.UUID;

@RequiredArgsConstructor

@RequestMapping("v4/user/public-user")
@RestController
public class PublicUserControllerV4 {

    private final AppUserService appUserService;
    private final PublicUserService publicUserService;
    private final S3Service s3Service;

    @GetMapping("{appUserId}")
    public PublicUserResponse getPublicUserByAppUserId(@PathVariable("appUserId") Long appUserId) {
        PublicUser publicUser = publicUserService.getPublicUserByAppUserId(appUserId);
        AppUser appUser = appUserService.getAppUserById(appUserId);

        return PublicUserResponse.of(publicUser, appUser);
    }

    @GetMapping("by-name")
    public PublicUserResponse getPublicUserByNickname(@RequestParam("name") String nickName) {
        PublicUser publicUser = publicUserService.getPublicUserByNickname(nickName);
        AppUser appUser = appUserService.getAppUserById(publicUser.getAppUser().getAppUserId());

        return PublicUserResponse.of(publicUser, appUser);
    }

    @PutMapping("{appUserId}")
    public UpdateSuccessResponse editPublicUser(@PathVariable("appUserId") Long appUserId,
                                                @RequestBody @Valid PublicUserEditRequest publicUserEditRequest) {
        PublicUser publicUser = PublicUser.builder()
                .appUserId(appUserId)
                .nickName(publicUserEditRequest.getNickName())
                .profileImage(publicUserEditRequest.getProfileImage())
                .build();

        PublicUser updatedPublicUser = publicUserService.updatePublicUser(publicUser);

        return UpdateSuccessResponse.builder()
                .updated(updatedPublicUser)
                .build();
    }

    @SneakyThrows
    @PostMapping("/upload")
    public S3UploadSuccessResponse uploadProfileImage(@RequestParam("file") MultipartFile multipartFile) {
        String fileName = UUID.randomUUID().toString().substring(0, 10);
        File fileToUpload = new File(multipartFile.getOriginalFilename());
        multipartFile.transferTo(fileToUpload);

        String uploadedUrl = s3Service.uploadFile(fileName, fileToUpload);

        return S3UploadSuccessResponse.builder()
                .url(uploadedUrl)
                .build();
    }

}
