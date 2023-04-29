package com.jinkyumpark.search.settings;

import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.search.security.LoginUser;
import com.jinkyumpark.search.security.User;
import com.jinkyumpark.search.settings.dtos.SettingsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("v3/search/settings")
public class SettingsControllerV3 {

    private final SettingsService settingsService;

    @GetMapping("search-range/all")
    public SettingsDto getSettingsByAppUserId(@LoginUser User loginUser) {
        return settingsService
                .getSettingsByAppUserId(loginUser.getId())
                .toDto();
    }

    @PutMapping("offline-library/search-method")
    public UpdateSuccessResponse changeOfflineLibrarySearchMethod(@LoginUser User loginUser,
                                                                  @RequestBody ChangeLibrarySearchMethodRequest changeRequest) {
        settingsService.updateSettings(changeRequest.toDto(loginUser.getId()));

        return UpdateSuccessResponse.builder().build();
    }

}
