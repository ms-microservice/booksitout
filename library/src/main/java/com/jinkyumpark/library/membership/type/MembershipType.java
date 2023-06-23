package com.jinkyumpark.library.membership.type;

import com.jinkyumpark.library.membership.typeLibrary.MembershipTypeLibrary;
import com.jinkyumpark.library.region.region.Region;
import com.jinkyumpark.library.region.regionDetail.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class MembershipType {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String name;

    @Column(length = 50)
    private String logo;

    @Column(length = 500)
    private String description;

    @Column(name = "type", nullable = false, length = 12)
    @Enumerated(value = EnumType.STRING)
    private MembershipTypeKind type;

    @ManyToOne @JoinColumn(name = "region_id")
    private Region region;

    @ManyToOne @JoinColumn(name = "region_detail_id")
    private RegionDetail regionDetail;

    @OneToMany(mappedBy = "membershipType")
    private List<MembershipTypeLibrary> usableLibraries;

    public String getLogo() {
        if (regionDetail != null) {
            return regionDetail.getLogo();
        }

        if (region != null) {
            return region.getLogo();
        }

        return logo;
    }

    public String getName() {
        if (regionDetail != null) {
            return regionDetail.getKoreanName();
        }

        if (region != null) {
            return region.getKoreanName();
        }

        return name;
    }

}
