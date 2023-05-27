package com.jinkyumpark.library.library.dto;

import com.jinkyumpark.library.library.Library;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryAutoCompleteResponse {

    private Long id;
    private String name;
    private String address;

    public static LibraryAutoCompleteResponse of(Library library) {
        return LibraryAutoCompleteResponse.builder()
                .id(library.getLibraryId())
                .name(library.getName())
                .address(library.getAddress())
                .build();
    }

}
