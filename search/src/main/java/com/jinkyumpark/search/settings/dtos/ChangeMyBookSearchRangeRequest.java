package com.jinkyumpark.search.settings.dtos;

import com.jinkyumpark.search.settings.model.MyBookSearchRange;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import javax.validation.constraints.NotBlank;

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
