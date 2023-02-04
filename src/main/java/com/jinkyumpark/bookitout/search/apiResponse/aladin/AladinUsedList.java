package com.jinkyumpark.bookitout.search.apiResponse.aladin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class AladinUsedList {
    private AladinUsed aladinUsed;
    private AladinUserUsed userUsed;
    private AladinSpaceUsed spaceUsed;
}
