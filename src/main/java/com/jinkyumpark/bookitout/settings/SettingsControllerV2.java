package com.jinkyumpark.bookitout.settings;

import com.jinkyumpark.bookitout.common.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.settings.dtos.ChangeRegionRequest;
import com.jinkyumpark.bookitout.settings.dtos.SettingsDto;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.user.login.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v2/settings")
public class SettingsControllerV2 {

    private final SettingsService settingsService;

    @PostMapping("change-region")
    public EditSuccessResponse changeRegion(@Valid @RequestBody ChangeRegionRequest changeRegionRequest,
                                            @LoginUser LoginAppUser loginAppUser) {

        SettingsDto settingsDto = changeRegionRequest.toDto(loginAppUser.getId());
        settingsService.changeRegion(settingsDto);

        return EditSuccessResponse.builder()
                .path("POST /v2/settings/change-region")
                .build();
    }
}
