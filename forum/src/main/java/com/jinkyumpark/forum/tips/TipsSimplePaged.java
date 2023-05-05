package com.jinkyumpark.forum.tips;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TipsSimplePaged {

    private int totalPages;
    private boolean hasMore;
    private List<TipsSimple> content;

}
