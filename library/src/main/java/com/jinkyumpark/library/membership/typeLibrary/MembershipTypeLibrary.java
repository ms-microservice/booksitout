package com.jinkyumpark.library.membership.typeLibrary;

import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.membership.type.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class MembershipTypeLibrary {

    @EmbeddedId
    private MembershipTypeLibraryKey membershipTypeLibraryKey;

    @MapsId("membershipTypeId")
    @ManyToOne @JoinColumn(name = "membership_type_id")
    private MembershipType membershipType;

    @MapsId("libraryId")
    @ManyToOne @JoinColumn(name = "library_id")
    private Library library;

}
