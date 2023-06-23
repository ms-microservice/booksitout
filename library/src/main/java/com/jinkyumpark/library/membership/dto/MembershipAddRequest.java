package com.jinkyumpark.library.membership.dto;

import com.jinkyumpark.library.membership.Membership;
import com.jinkyumpark.library.membership.type.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class MembershipAddRequest {

    @NotBlank private String number;
    @NotNull private Long typeId;
    private String memo;

    public Membership toEntity(Long appUserId) {
        return Membership.builder()
                .number(number)
                .memo(memo)
                .type(MembershipType.builder().id(typeId).build())

                .appUserId(appUserId)
                .build();
    }

}

