package com.jinkyumpark.library.membership.imageRecognition;

import com.jinkyumpark.library.membership.type.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryMembershipImageRecognitionResponse {

    private String number;

    private Long typeId;
    private String logo;
    private String name;

    public static LibraryMembershipImageRecognitionResponse of(String number, MembershipType membershipType) {
        return LibraryMembershipImageRecognitionResponse.builder()
                .number(number)

                .typeId(membershipType.getId())
                .logo(membershipType.getLogo())
                .name(membershipType.getName())

                .build();
    }

}
