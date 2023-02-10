package com.jinkyumpark.bookitout.search.apiResponse.ridi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiRidiAuthor {
    private String role;
    private String name;
    private String author_id;
    private String alias_name;
    private String native_name;
    private String order;
}