package com.jinkyumpark.library.library;

import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.library.common.PageService;
import com.jinkyumpark.library.library.dto.LibraryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("v5/library/available-library")
public class LibraryControllerV5 {

    private final LibraryService libraryService;
    private final PageService pageService;

    @GetMapping("{libraryId}")
    public LibraryResponse getLibraryId(@PathVariable("libraryId") Long libraryId) {
        Library library = libraryService.getLibraryId(libraryId);
        return LibraryResponse.of(library);
    }

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

    @GetMapping
    public PagedResponse getLibraryByQuery(@RequestParam("query") String query,
                                           @RequestParam(value = "page", required = false) Integer page,
                                           @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(page, size);

        Page<Library> libraryPaged = libraryService.getLibraryByQuery(query, pageable);

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

    @GetMapping("by-region/{type}/{regionId}")
    public PagedResponse getLibraryByRegion(@PathVariable("type") String type,
                                            @PathVariable("regionId") Long regionId,
                                            @RequestParam(value = "page", required = false) Integer page,
                                            @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(page, size);

        Page<Library> libraryPaged;
        if (type.equalsIgnoreCase("region")) libraryPaged = libraryService.getLibraryByRegionId(regionId, pageable);
        else libraryPaged = libraryService.getLibraryByRegionDetailId(regionId, pageable);

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

    @GetMapping("by-radius")
    public PagedResponse getLibraryByLocationAndRadius(@RequestParam("lat") Double latitude,
                                                       @RequestParam("long") Double longitude,
                                                       @RequestParam(value = "radius", required = false) Integer radiusInMeter,
                                                       @RequestParam(value = "page", required = false) Integer page,
                                                       @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(page, size);

        Page<Library> libraryPaged = libraryService.getLibraryByLatitudeAndLongitudeRange(latitude, longitude, radiusInMeter, pageable);

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
