package com.jinkyumpark.library.library;

import com.jinkyumpark.library.region.regionDetail.RegionDetail;
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

    @ManyToOne @JoinColumn(name = "region_detail_id", nullable = false)
    private RegionDetail regionDetail;

    private String phone;
    private String homePage;
    private String openHour;
    private String openDay;
    private Integer bookCount;
    private Integer data4LibCode;

    public Library(String name, String address, Double latitude, Double longitude, RegionDetail regionDetail, String phone, String homePage, String openHour, String openDay, Integer bookCount, Integer data4LibCode) {
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

    public Library update(Library library) {
        if (library.getAddress() != null) {
            this.address = library.getAddress();
        }

        if (library.getLatitude() != null) {
            this.latitude = library.getLatitude();
        }

        if (library.getLongitude() != null) {
            this.longitude = library.getLongitude();
        }

        if (library.getPhone() != null) {
            this.phone = library.getPhone();
        }

        if (library.getHomePage() != null) {
            this.homePage = library.getHomePage();
        }

        if (library.getOpenHour() != null) {
            this.openHour = library.getOpenHour();
        }

        if (library.getOpenDay() != null) {
            this.openDay = library.getOpenDay();
        }

        if (library.getBookCount() != null && library.getBookCount() != 0) {
            this.bookCount = library.getBookCount();
        }

        if (library.getData4LibCode() != null) {
            this.data4LibCode = library.getData4LibCode();
        }

        return this;
    }

}
