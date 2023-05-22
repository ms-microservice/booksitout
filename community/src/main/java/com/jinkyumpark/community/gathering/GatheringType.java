package com.jinkyumpark.community.gathering;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GatheringType {

    CHECKING("서로 확인만"),
    TALKING("가볍게 얘기만"),
    DISCUSSION("진지하게 토론"),
    BOOK_REPORT("독후감 포함"),
    FREE("자유롭게");

    private final String displayName;

}
