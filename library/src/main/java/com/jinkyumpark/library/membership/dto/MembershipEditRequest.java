package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.membership.LibraryMembership;
import com.jinkyumpark.library.region.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class MembershipEditRequest {

    private Long region;
    private String number;

    public LibraryMembership toEntity(Long appUserId, Long membershipId) {
        return LibraryMembership.builder()
                .libraryMembershipId(membershipId)
                .appUserId(appUserId)

                .region(RegionDetail.builder().regionDetailId(region).build())
                .number(number)
                .build();
    }

}
