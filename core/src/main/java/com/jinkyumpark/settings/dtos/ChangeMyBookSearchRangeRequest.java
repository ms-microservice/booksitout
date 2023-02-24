package com.jinkyumpark.settings.dtos;

import com.jinkyumpark.settings.model.MyBookSearchRange;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ChangeMyBookSearchRangeRequest {
    @NotNull
    @NotBlank
    private String range;

    public SettingsDto toDto(Long loginAppUserId) {
        return SettingsDto.builder()
                .appUserId(loginAppUserId)
                .myBookSearchRange(MyBookSearchRange.valueOf(range.toUpperCase()))
                .build();
    }
}
