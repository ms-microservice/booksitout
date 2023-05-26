package com.jinkyumpark.library.common;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PageService {

    public Pageable getPageable(Integer page, Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;

        return PageRequest.of(page - 1, size);
    }

}
