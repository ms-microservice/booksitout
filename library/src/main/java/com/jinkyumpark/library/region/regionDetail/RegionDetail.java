package com.jinkyumpark.library.region.regionDetail;

import com.jinkyumpark.library.region.region.Region;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class RegionDetail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long regionDetailId;

    @Column(length = 20, nullable = false) private String koreanName;
    @Column(length = 20) private String englishName;

    private String logo;
    private Integer data4LibCode;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    public RegionDetail(Long regionDetailId) {
        this.regionDetailId = regionDetailId;
    }

}
