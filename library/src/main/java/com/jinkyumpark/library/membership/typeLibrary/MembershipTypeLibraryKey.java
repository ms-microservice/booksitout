package com.jinkyumpark.library.membership.typeLibrary;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Embeddable
public class MembershipTypeLibraryKey implements Serializable {

    @Column(name = "membership_type_id")
    private Long membershipTypeId;

    @Column(name = "library_id")
    private Long libraryId;

}
