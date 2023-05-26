package com.jinkyumpark.library.library.dto;

import com.jinkyumpark.library.library.Library;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryResponse {

    private Long id;

    private String name;

    private String phone;
    private String homepage;

    private Integer bookCount;
    private String openHour;
    private String openDay;

    private LibraryResponseLocation location;

    public static LibraryResponse of(Library library) {
        return LibraryResponse.builder()
                .id(library.getLibraryId())
                .name(library.getName())
                .phone(library.getPhone())
                .homepage(library.getHomePage())
                .bookCount(library.getBookCount())
                .openDay(library.getOpenDay())
                .openHour(library.getOpenHour())
                .location(LibraryResponseLocation.builder()
                                .address(library.getAddress())
                                .latitude(library.getLatitude())
                                .longitude(library.getLongitude())
                                .name(library.getRegionDetail().getKoreanName())
                                .logo(library.getRegionDetail().getLogo())
                                .build()
                )
                .build();
    }

}
