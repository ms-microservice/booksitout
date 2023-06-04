package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.membership.Membership;
import com.jinkyumpark.library.membership.type.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class MembershipEditRequest {

    private String number;
    private String memo;
    private Long typeId;

    public Membership toEntity(Long appUserId, Long membershipId) {
        return Membership.builder()
                .libraryMembershipId(membershipId)

                .number(number)
                .memo(memo)
                .type(MembershipType.builder().id(typeId).build())

                .appUserId(appUserId)
                .build();
    }

}
