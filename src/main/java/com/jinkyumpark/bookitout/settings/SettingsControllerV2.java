package com.jinkyumpark.bookitout.settings;

import com.jinkyumpark.bookitout.common.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.common.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.settings.dtos.ChangeMyBookSearchRangeRequest;
import com.jinkyumpark.bookitout.settings.dtos.ChangeRangeRequest;
import com.jinkyumpark.bookitout.settings.dtos.ChangeRegionRequest;
import com.jinkyumpark.bookitout.settings.dtos.SettingsDto;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.user.login.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v2/settings")
public class SettingsControllerV2 {

    private final SettingsService settingsService;

    @PutMapping("search/my-book/search-range")
    public EditSuccessResponse changeMyBookSearchRange(@Valid @RequestBody ChangeMyBookSearchRangeRequest changeMyBookSearchRangeRequest,
                                                       @LoginUser LoginAppUser loginAppUser) {
        SettingsDto settingsDto = changeMyBookSearchRangeRequest.toDto(loginAppUser.getId());
        settingsService.updateSettings(settingsDto);

        return EditSuccessResponse.builder()
                .path("PUT /v2/settings/my-book/search-range")
                .build();
    }

    @DeleteMapping("search/library-offline/region")
    public DeleteSuccessResponse deleteRegion(@LoginUser LoginAppUser loginAppUser) {

        settingsService.deleteRegionSettings(loginAppUser.getId());

        return DeleteSuccessResponse.builder()
                .path("DELETE search/library-offline/region")
                .build();
    }

    @PutMapping("search/library-offline/region")
    public EditSuccessResponse changeRegion(@Valid @RequestBody ChangeRegionRequest changeRegionRequest,
                                            @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = changeRegionRequest.toDto(loginAppUser.getId());
        settingsService.updateSettings(settingsDto);

        return EditSuccessResponse.builder()
                .path("POST /v2/settings/change-region")
                .build();
    }

    @PutMapping("search/library-online/search-range")
    public EditSuccessResponse changeLibraryOnlineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                              @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .libraryOnlineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return EditSuccessResponse.builder()
                .path("PUT /v2/settings/search/library-online/search-range ")
                .build();
    }

    @PutMapping("search/subscription/search-range")
    public EditSuccessResponse changeSubscriptionSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                             @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .subscriptionSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return EditSuccessResponse.builder()
                .path("PUT /v2/settings/search/search/subscription/search-range ")
                .build();
    }

    @PutMapping("search/used-online/search-range")
    public EditSuccessResponse changeUsedOnlineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                           @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .usedOnlineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return EditSuccessResponse.builder()
                .path("PUT /v2/settings/search/used-online/search-range ")
                .build();
    }

    @PutMapping("search/used-offline/search-range")
    public EditSuccessResponse changeUsedOfflineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                            @LoginUser LoginAppUser loginAppUser) {
        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .usedOfflineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return EditSuccessResponse.builder()
                .path("PUT /v2/settings/search/used-offline/search-range ")
                .build();
    }
}
