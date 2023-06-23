package com.jinkyumpark.library.region;

import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.library.common.PageUtils;
import com.jinkyumpark.library.region.region.Region;
import com.jinkyumpark.library.region.regionDetail.RegionDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/region")
public class RegionControllerV5 {

    private final RegionService regionService;

    @GetMapping
    public PagedResponse<List<RegionDetailResponse>> getRegionByQuery(@RequestParam("query") String query,
                                                                      @RequestParam(value = "page", required = false) Integer page,
                                                                      @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = PageUtils.getPageable(page, size);
        Page<RegionDetail> regionPaged = regionService.getAllRegionDetailByName(query, pageable);

        return PagedResponse.<List<RegionDetailResponse>>builder()
                .first(regionPaged.isFirst())
                .last(regionPaged.isLast())
                .totalPages(regionPaged.getTotalPages())
                .totalElements((int) regionPaged.getTotalElements())
                .content(regionPaged.getContent().stream()
                        .map(RegionDetailResponse::of)
                        .collect(Collectors.toList())
                )
                .build();
    }

    @GetMapping("full")
    public PagedResponse<List<RegionResponse>> getRegionFullByQuery(@RequestParam("query") String query,
                                                                    @RequestParam(value = "page", required = false) Integer page,
                                                                    @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = PageUtils.getPageable(page, size);
        Page<Region> regionPaged = regionService.getAllRegionByName(query, pageable);
        Page<RegionDetail> regionDetailPaged = regionService.getAllRegionDetailByName(query, pageable);

        List<RegionResponse> content = new ArrayList<>();

        content.addAll(regionPaged.getContent().stream()
                .map(RegionResponse::of)
                .collect(Collectors.toList())
        );

        content.addAll(regionDetailPaged.getContent().stream()
                .map(RegionResponse::of)
                .collect(Collectors.toList())
        );

        return PagedResponse.<List<RegionResponse>>builder()
                .first(regionDetailPaged.isFirst())
                .last(regionDetailPaged.isLast())
                .totalPages(regionDetailPaged.getTotalPages())
                .totalElements((int) regionDetailPaged.getTotalElements())

                .content(content)
                .build();
    }

    @GetMapping("by-english-name")
    public RegionResponse getRegionByEnglishName(@RequestParam("english-name") String englishName) {
        Region region = regionService.getRegionByEnglishName(englishName.toUpperCase());
        RegionDetail regionDetail = regionService.getRegionDetailByEnglishName(englishName.toUpperCase());

        if (region == null && regionDetail == null) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "region with that name not present");
        }

        if (region != null) {
            return RegionResponse.of(region);
        }

        return RegionResponse.of(regionDetail);
    }

}
