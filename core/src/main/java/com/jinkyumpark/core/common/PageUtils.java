package com.jinkyumpark.core.common;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageUtils {

    private static final int DEFAULT_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;

    public static Pageable pageable(Integer page, Integer size) {
        return PageRequest.of(
                page == null ? DEFAULT_PAGE : page - 1,
                size == null ? DEFAULT_SIZE : size
        );
    }

    public static Pageable pageableSorted(Integer page, Integer size, String sort) {
        return PageRequest.of(
                page == null ? DEFAULT_PAGE : page - 1,
                size == null ? DEFAULT_SIZE : size,
                Sort.by(sort)
        );
    }

    public static Pageable pageableSortedDesc(Integer page, Integer size, String sort) {
        return PageRequest.of(
                page == null ? DEFAULT_PAGE : page - 1,
                size == null ? DEFAULT_SIZE : size,
                Sort.by(sort).descending()
        );
    }

}
