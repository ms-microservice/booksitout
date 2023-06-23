package com.jinkyumpark.library.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessageKey {

    MEMBERSHIP_GET_NOT_FOUND("membership.get.not-found"),
    MEMBERSHIP_PUT_NOT_FOUND("membership.put.not-found"),
    MEMBERSHIP_PUT_UNAUTHORIZED("membership.put.unauthorized"),
    MEMBERSHIP_DELETE_NOT_FOUND("membership.delete.not-found"),
    MEMBERSHIP_DELETE_UNAUTHORIZED("membership.delete.unauthorized")

    ;

    private final String key;

}
