package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.membership.LibraryMembership;
import com.jinkyumpark.library.region.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryMembershipResponse {

    private Long id;
    private String number;

    private LibraryMembershipResponseRegion region;

    public static LibraryMembershipResponse of(LibraryMembership libraryMembership) {
        return LibraryMembershipResponse.builder()
                .id(libraryMembership.getLibraryMembershipId())
                .number(libraryMembership.getNumber())

                .build();
    }

    public static LibraryMembershipResponse of(LibraryMembership libraryMembership, RegionDetail regionDetail) {
        return LibraryMembershipResponse.builder()
                .id(libraryMembership.getLibraryMembershipId())
                .number(libraryMembership.getNumber())

                .region(LibraryMembershipResponseRegion.builder()
                        .id(regionDetail.getRegionDetailId())
                        .koreanName(regionDetail.getKoreanName())
                        .englishName(regionDetail.getEnglishName())
                        .logo(regionDetail.getLogo())
                        .build())

                .build();
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class LibraryMembershipResponseRegion {

    private Long id;
    private String koreanName;
    private String englishName;
    private String logo;

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class LibraryMembershipResponseUser {

    private Long id;
    private String name;
    private String profileImage;

}
