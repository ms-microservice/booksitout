package com.jinkyumpark.bookitout.search.response.library;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AvailableLibrary {
    private String code;
    private String name;
    private String address;
    private String libraryLink;
    private String bookLink;
}