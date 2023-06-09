package com.jinkyumpark.library.region.region;

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
public class Region {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long regionId;

    @Column(nullable = false, length = 20) private String koreanName;
    @Column(length = 20) private String englishName;

    private String logo;
    private Integer data4LibCode;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 10, nullable = false)
    private Country country;

    @OneToMany(mappedBy = "region", orphanRemoval = true)
    private List<RegionDetail> regionDetailList;

}
