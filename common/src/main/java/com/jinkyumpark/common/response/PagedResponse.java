package com.jinkyumpark.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PagedResponse<T> {

    private boolean first;
    private boolean last;

    private int totalElements;
    private int totalPages;

    private T content;

}
