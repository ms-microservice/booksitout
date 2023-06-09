package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.library.dto.LibraryDto;
import com.jinkyumpark.library.membership.Membership;
import com.jinkyumpark.library.membership.typeLibrary.MembershipTypeLibrary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class MembershipResponse {

    private Long id;
    private String number;
    private String memo;

    private String logo;
    private String name;
    private String description;

    private List<LibraryDto> usableLibrary;

    public static MembershipResponse of(Membership membership) {
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

        return MembershipResponse.builder()
                .id(membership.getLibraryMembershipId())
                .number(membership.getNumber())
                .memo(membership.getMemo())

                .logo(logo)
                .name(name)
                .description(membership.getType().getDescription())

                .usableLibrary(
                        membership.getType().getUsableLibraries() == null ?
                                null
                                :
                                membership.getType().getUsableLibraries().stream()
                                        .map(MembershipTypeLibrary::getLibrary)
                                        .map(LibraryDto::of)
                                        .collect(Collectors.toList())
                )

                .build();
    }

}
