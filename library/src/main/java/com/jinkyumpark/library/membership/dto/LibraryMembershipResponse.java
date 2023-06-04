package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.library.dto.LibraryResponse;
import com.jinkyumpark.library.membership.Membership;
import com.jinkyumpark.library.region.Region;
import com.jinkyumpark.library.region.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryMembershipResponse {

    private Long id;
    private String number;
    private String memo;

    private String logo;
    private String name;
    private String description;

    private List<LibraryResponse> usableLibrary;

    public static LibraryMembershipResponse of(Membership membership) {
        String logo;
        String name;

        if (membership.getType().getRegionDetail() != null) {
            logo = membership.getType().getRegionDetail().getLogo();
            name = membership.getType().getRegionDetail().getKoreanName();
        } else if (membership.getType().getRegion() != null) {
            logo = membership.getType().getRegion().getLogo();
            name = membership.getType().getRegion().getKoreanName();
        } else {
            logo = membership.getType().getLogo();
            name = membership.getType().getName();
        }

        return LibraryMembershipResponse.builder()
                .id(membership.getLibraryMembershipId())
                .number(membership.getNumber())
                .memo(membership.getMemo())

                .logo(logo)
                .name(name)
                .description(membership.getType().getDescription())

                .build();
    }

    public static LibraryMembershipResponse of(Membership membership, Region region) {
        return LibraryMembershipResponse.builder()
                .id(membership.getLibraryMembershipId())
                .number(membership.getNumber())
                .memo(membership.getMemo())

                .name(region.getKoreanName())
                .logo(region.getLogo())

                .build();
    }

    public static LibraryMembershipResponse of(Membership membership, RegionDetail regionDetail) {
        return LibraryMembershipResponse.builder()
                .id(membership.getLibraryMembershipId())
                .number(membership.getNumber())
                .memo(membership.getMemo())

                .name(regionDetail.getKoreanName())
                .logo(regionDetail.getLogo())

                .build();
    }

}
