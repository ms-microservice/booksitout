package com.jinkyumpark.user.settings;

import com.jinkyumpark.user.settings.dtos.SettingsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SettingsService {
    private final SettingsRepository settingsRepository;

    public Settings getSettingsByAppUserId(Long appUserId) {
        return settingsRepository.findByAppUserId(appUserId)
                .orElse(null);
    }

    @Transactional
    public void updateSettings(SettingsDto settingsDto) {
        Optional<Settings> settingsOptional = settingsRepository.findByAppUserId(settingsDto.getAppUserId());

        if (settingsOptional.isEmpty()) {
            settingsRepository.save(settingsDto.toEntity());
            return;
        }

        settingsOptional.get().update(settingsDto);
    }

    @Transactional
    public void deleteRegionSettings(Long loginAppUserId) {
        Optional<Settings> settingsOptional = settingsRepository.findByAppUserId(loginAppUserId);

        if (settingsOptional.isEmpty()) {
            return;
        }

        settingsOptional.get().deleteRegion();
    }
}
