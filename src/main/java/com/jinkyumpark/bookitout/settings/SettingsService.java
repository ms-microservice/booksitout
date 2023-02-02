package com.jinkyumpark.bookitout.settings;

import com.jinkyumpark.bookitout.settings.dtos.SettingsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SettingsService {
    private final SettingsRepository settingsRepository;

    @Transactional
    public void changeRegion(SettingsDto settingsDto) {
        Optional<Settings> settingsOptional = settingsRepository.findByAppUserId(settingsDto.getAppUserId());

        if (settingsOptional.isEmpty()) {
            settingsRepository.save(settingsDto.toEntity());
            return;
        }

        settingsOptional.get().update(settingsDto);
    }
}
