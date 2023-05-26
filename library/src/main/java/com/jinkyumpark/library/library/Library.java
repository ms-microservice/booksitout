package com.jinkyumpark.library.library;

import com.jinkyumpark.library.region.RegionDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class Library {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryId;

    private String name;

    private String address;
    private Double latitude;
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "region_detail_id", nullable = false)
    private RegionDetail regionDetail;

    private Long phone;
    private String homePage;
    private String openHour;
    private String openDay;
    private Integer bookCount;
    private Integer data4LibCode;

    public Library(String name, String address, Double latitude, Double longitude, RegionDetail regionDetail, Long phone, String homePage, String openHour, String openDay, Integer bookCount, Integer data4LibCode) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.regionDetail = regionDetail;
        this.phone = phone;
        this.homePage = homePage;
        this.openHour = openHour;
        this.openDay = openDay;
        this.bookCount = bookCount;
        this.data4LibCode = data4LibCode;
    }

}
