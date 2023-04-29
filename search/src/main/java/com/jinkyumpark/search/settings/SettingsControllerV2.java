package com.jinkyumpark.search.settings;

import com.jinkyumpark.search.security.LoginUser;
import com.jinkyumpark.search.security.User;
import com.jinkyumpark.search.settings.dtos.ChangeMyBookSearchRangeRequest;
import com.jinkyumpark.search.settings.dtos.ChangeRangeRequest;
import com.jinkyumpark.search.settings.dtos.ChangeRegionRequest;
import com.jinkyumpark.search.settings.dtos.SettingsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v2/settings/search")
public class SettingsControllerV2 {

    private final SettingsService settingsService;

    @PutMapping("my-book/search-range")
    public UpdateSuccessResponse changeMyBookSearchRange(@Valid @RequestBody ChangeMyBookSearchRangeRequest changeMyBookSearchRangeRequest,
                                                         @LoginUser User loginAppUser) {
        SettingsDto settingsDto = changeMyBookSearchRangeRequest.toDto(loginAppUser.getId());
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @DeleteMapping("library-offline/region")
    public DeleteSuccessResponse deleteRegion(@LoginUser User loginAppUser) {

        settingsService.deleteRegionSettings(loginAppUser.getId());

        return DeleteSuccessResponse.builder().build();
    }

    @PutMapping("library-offline/region")
    public UpdateSuccessResponse changeRegion(@Valid @RequestBody ChangeRegionRequest changeRegionRequest,
                                              @LoginUser User loginAppUser) {

        SettingsDto settingsDto = changeRegionRequest.toDto(loginAppUser.getId());
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("library-online/search-range")
    public UpdateSuccessResponse changeLibraryOnlineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                                @LoginUser User loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .libraryOnlineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("subscription/search-range")
    public UpdateSuccessResponse changeSubscriptionSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                               @LoginUser User loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .subscriptionSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("used-online/search-range")
    public UpdateSuccessResponse changeUsedOnlineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                             @LoginUser User loginAppUser) {

        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .usedOnlineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }

    @PutMapping("used-offline/search-range")
    public UpdateSuccessResponse changeUsedOfflineSearchRange(@Valid @RequestBody ChangeRangeRequest changeRangeRequest,
                                                              @LoginUser User loginAppUser) {
        SettingsDto settingsDto = SettingsDto.builder()
                .appUserId(loginAppUser.getId())
                .usedOfflineSearchRange(changeRangeRequest.getRange())
                .build();
        settingsService.updateSettings(settingsDto);

        return UpdateSuccessResponse.builder().build();
    }
}
