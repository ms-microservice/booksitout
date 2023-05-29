package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.membership.LibraryMembership;
import com.jinkyumpark.library.region.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class MembershipAddRequest {

    private String number;
    private Long region;

    public LibraryMembership toEntity(Long appUserId) {
        return LibraryMembership.builder()
                .number(number)
                .region(RegionDetail.builder()
                        .regionDetailId(region)
                        .build())
                .appUserId(appUserId)
                .build();
    }

}

