package com.jinkyumpark.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor @Builder
public class PagedResponse {

    private final boolean first;
    private final boolean last;

    private final int totalElements;
    private final int totalPages;

    private final Object content;
}
