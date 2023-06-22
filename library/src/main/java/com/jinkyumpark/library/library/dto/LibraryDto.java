package com.jinkyumpark.library.library.dto;

import com.jinkyumpark.library.library.Library;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryDto {

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

    public static LibraryDto of(Library library, double distance) {
        return LibraryDto.builder()
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
                                .name(LibraryResponseName.builder()
                                        .displayName(library.getRegionDetail().getKoreanName())

                                        .regionEnglishName(library.getRegionDetail().getRegion().getEnglishName())
                                        .regionDetailEnglishName(library.getRegionDetail().getEnglishName())

                                        .build()
                                )
                                .logo(library.getRegionDetail().getLogo())
                                .distance(distance)

                                .build()
                )
                .build();
    }

    public static LibraryDto of(Library library) {
        return LibraryDto.builder()
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
                        .name(LibraryResponseName.builder()
                                .displayName(library.getRegionDetail().getKoreanName())

                                .regionEnglishName(library.getRegionDetail().getRegion().getEnglishName())
                                .regionDetailEnglishName(library.getRegionDetail().getEnglishName())

                                .build()
                        )
                        .logo(library.getRegionDetail().getLogo())

                        .build()
                )

                .build();
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class LibraryResponseLocation {

    private String address;
    private Double latitude;
    private Double longitude;

    private LibraryResponseName name;
    private String logo;

    private double distance;

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class LibraryResponseName {

    private String displayName;

    private String regionEnglishName;
    private String regionDetailEnglishName;

}
