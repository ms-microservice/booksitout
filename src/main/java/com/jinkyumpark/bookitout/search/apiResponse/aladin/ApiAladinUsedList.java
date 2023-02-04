package com.jinkyumpark.bookitout.search.apiResponse.aladin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiAladinUsedList {
    private ApiAladinUsed aladinUsed;
    private ApiAladinUserUsed userUsed;
    private ApiAladinSpaceUsed spaceUsed;
}
