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

    public Double getDistance() {
        return location.getDistance();
    }

    public static LibraryResponse of(Library library, double distance) {
        return LibraryResponse.builder()
                .id(library.getLibraryId())
                .name(library.getName())
                .phone(library.getPhone())
                .homepage(library.getHomePage())
                .bookCount(library.getBookCount())
                .openDay(library.getOpenDay())
                .openHour(library.getOpenHour())
                .location(
                        LibraryResponseLocation.builder()
                                .address(library.getAddress())
                                .latitude(library.getLatitude())
                                .longitude(library.getLongitude())
                                .name(library.getRegionDetail().getKoreanName())
                                .logo(library.getRegionDetail().getLogo())
                                .distance(distance)
                                .build()
                )
                .build();
    }

    public static LibraryResponse of(Library library) {
        return LibraryResponse.builder()
                .id(library.getLibraryId())
                .name(library.getName())
                .phone(library.getPhone())
                .homepage(library.getHomePage())
                .bookCount(library.getBookCount())
                .openDay(library.getOpenDay())
                .openHour(library.getOpenHour())
                .location(
                        LibraryResponseLocation.builder()
                                .address(library.getAddress())
                                .latitude(library.getLatitude())
                                .longitude(library.getLongitude())
                                .name(library.getRegionDetail().getKoreanName())
                                .englishName(library.getRegionDetail().getEnglishName())
                                .logo(library.getRegionDetail().getLogo())
                                .build()
                )
                .build();
    }

}

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class LibraryResponseLocation {

    private String address;
    private Double latitude;
    private Double longitude;

    private String name;
    private String englishName;
    private String logo;

    private double distance;

}
