package com.jinkyumpark.search.settings;

import com.jinkyumpark.search.settings.dtos.SettingsDto;
import com.jinkyumpark.search.settings.model.LibrarySearchMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ChangeLibrarySearchMethodRequest implements Serializable {
    @NotNull
    @NotBlank
    private String method;

    public SettingsDto toDto(Long appUserId) {
        return SettingsDto.builder()
                .appUserId(appUserId)
                .librarySearchMethod(LibrarySearchMethod.valueOf(method))
                .build();
    }
}
