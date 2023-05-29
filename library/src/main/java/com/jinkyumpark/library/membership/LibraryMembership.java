package com.jinkyumpark.library.membership;

import com.jinkyumpark.library.region.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class LibraryMembership {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryMembershipId;

    @Column(length = 20)
    private String number;

    @ManyToOne @JoinColumn(name = "region_detail_id")
    private RegionDetail region;

    @Column(name = "app_user_id", nullable = false)
    private Long appUserId;


    public LibraryMembership update(LibraryMembership toUpdate) {
        if (toUpdate.getRegion() != null) {
            region = toUpdate.getRegion();
        }

        if (toUpdate.getNumber() != null) {
            number = toUpdate.getNumber();
        }

        if (toUpdate.getRegion() != null) {
            region = toUpdate.getRegion();
        }

        return this;
    }

}
