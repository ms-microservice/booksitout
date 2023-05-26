package com.jinkyumpark.library.library;

import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.library.common.PageService;
import com.jinkyumpark.library.library.dto.LibraryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/available-library")
public class LibraryControllerV5 {

    private final LibraryService libraryService;
    private final PageService pageService;

    @GetMapping("by-name")
    public PagedResponse getLibraryByName(@RequestParam("name") String name,
                                          @RequestParam(value = "page", required = false) Integer page,
                                          @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(page, size);

        Page<Library> libraryPaged = libraryService.getLibraryByName(name, pageable);

        return PagedResponse.builder()
                .first(libraryPaged.isFirst())
                .last(libraryPaged.isLast())
                .totalElements((int) libraryPaged.getTotalElements())
                .totalPages(libraryPaged.getTotalPages())
                .content(libraryPaged.getContent().stream()
                                .map(LibraryResponse::of)
                                .collect(Collectors.toList())
                )
                .build();
    }

}
