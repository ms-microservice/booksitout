package com.jinkyumpark.library.library.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LibraryResponseLocation {

    private String address;
    private Double latitude;
    private Double longitude;

    private String name;
    private String logo;

}
