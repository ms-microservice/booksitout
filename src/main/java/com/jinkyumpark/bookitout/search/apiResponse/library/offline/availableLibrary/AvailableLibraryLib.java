package com.jinkyumpark.bookitout.search.apiResponse.library.offline.availableLibrary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class AvailableLibraryLib {
    private String libCode;
    private String libName;
    private String address;
    private String tel;
    private String fax;
    private String latitude;
    private String longitude;
    private String homepage;
    private String closed;
    private String operatingTime;
}