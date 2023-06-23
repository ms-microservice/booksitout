package com.jinkyumpark.library.membership.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MembershipTypeKind {

    COUNTRY("국립, 나라 기관"),
    REGION("공립 (시립, 구립, 도립)"),
    PRIVATE("사립"),

    LIBRARY_ONE("통합 (책 이음 등)"),

    SCHOOL("학교 (대학, 초중고 등)"),
    OTHERS("기타")
    ;

    public final String displayName;

}
