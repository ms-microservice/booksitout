package com.jinkyumpark.library.region;

import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.library.common.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/region")
public class RegionControllerV5 {

    private final RegionService regionService;
    private final PageService pageService;

    @GetMapping
    public PagedResponse getRegionByQuery(@RequestParam("query") String query,
                                          @RequestParam(value = "page", required = false) Integer page,
                                          @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(page, size);

        Page<RegionDetail> regionPaged = regionService.getAllRegionByName(query, pageable);

        return PagedResponse.builder()
                .first(regionPaged.isFirst())
                .last(regionPaged.isLast())
                .totalPages(regionPaged.getTotalPages())
                .totalElements((int) regionPaged.getTotalElements())
                .content(regionPaged.getContent().stream()
                        .map(RegionDetailResponse::of)
                )
                .build();
    }

    @GetMapping("by-english-name")
    public RegionResponse getRegionByEnglishName(@RequestParam("english-name") String englishName) {
        RegionDetail regionDetail = regionService.getRegionDetailByEnglishName(englishName.toUpperCase());

        return RegionResponse.of(regionDetail);
    }

}
