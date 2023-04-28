package com.jinkyumpark.user.settings;

import com.jinkyumpark.user.loginUser.LoginAppUser;
import com.jinkyumpark.user.loginUser.LoginUser;
import com.jinkyumpark.user.settings.dtos.ChangeMyBookSearchRangeRequest;
import com.jinkyumpark.user.settings.dtos.ChangeRangeRequest;
import com.jinkyumpark.user.settings.dtos.ChangeRegionRequest;
import com.jinkyumpark.user.settings.dtos.SettingsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v2/settings")
public class SettingsControllerV2 {

    private final SettingsService settingsService;

    @PutMapping("search/my-book/search-range")
    public UpdateSuccessResponse changeMyBookSearchRange(@Valid @RequestBody ChangeMyBookSearchRangeRequest changeMyBookSearchRangeRequest,
                                                       @LoginUser LoginAppUser loginAppUser) {
        SettingsDto settingsDto = changeMyBookSearchRangeRequest.toDto(loginAppUser.getId());
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @DeleteMapping("search/library-offline/region")
    public DeleteSuccessResponse deleteRegion(@LoginUser LoginAppUser loginAppUser) {

        settingsService.deleteRegionSettings(loginAppUser.getId());

        return DeleteSuccessResponse.builder().build();
    }

    @PutMapping("search/library-offline/region")
    public UpdateSuccessResponse changeRegion(@Valid @RequestBody ChangeRegionRequest changeRegionRequest,
                                            @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = changeRegionRequest.toDto(loginAppUser.getId());
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("search/library-online/search-range")
    public UpdateSuccessResponse changeLibraryOnlineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                              @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .libraryOnlineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("search/subscription/search-range")
    public UpdateSuccessResponse changeSubscriptionSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                             @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .subscriptionSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("search/used-online/search-range")
    public UpdateSuccessResponse changeUsedOnlineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                           @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .usedOnlineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("search/used-offline/search-range")
    public UpdateSuccessResponse changeUsedOfflineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                            @LoginUser LoginAppUser loginAppUser) {
        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .usedOfflineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }
}
