package com.jinkyumpark.library.membership.type;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class MembershipTypeResponse {

    private Long id;
    private String name;
    private String logo;
    private String description;

    public static MembershipTypeResponse of(MembershipType membershipType) {
        String logo;
        String name;

        if (membershipType.getRegionDetail() != null) {
            logo = membershipType.getRegionDetail().getLogo();
            name = membershipType.getRegionDetail().getKoreanName();
        } else if (membershipType.getRegion() != null) {
            logo = membershipType.getRegion().getLogo();
            name = membershipType.getRegion().getKoreanName();
        } else {
            logo = membershipType.getLogo();
            name = membershipType.getName();
        }

        return MembershipTypeResponse.builder()
                .id(membershipType.getId())

                .name(name)
                .logo(logo)
                .description(membershipType.getDescription())

                .build();
    }

}
