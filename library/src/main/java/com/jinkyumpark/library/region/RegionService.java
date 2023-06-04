package com.jinkyumpark.library.region;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.library.common.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RegionService {

    private final RegionRepository regionRepository;
    private final RegionDetailRepository regionDetailRepository;
    private final PageService pageService;

    public RegionDetail getMostMatchRegionDetailByAddress(String address) {
        String[] split = address.split("\\s+");
        String region = split[0];
        String regionDetail = split[1];

        List<Region> regionList = regionRepository.findByKoreanName(region);
        Optional<RegionDetail> regionDetailOptional = regionList.get(0).getRegionDetailList().stream()
                .filter(r -> r.getKoreanName().contains(regionDetail))
                .findFirst();

        return regionDetailOptional.orElseGet(() -> regionDetailRepository.findById(1L).get());
    }

    public RegionDetail getMostMatchRegionDetailByAddressSnippet(String addressSnippet) {
        if (addressSnippet.isEmpty()) return null;

        Pageable pageable = pageService.getPageable(1, 1);

        List<RegionDetail> result = regionDetailRepository.findAllByKoreanName(addressSnippet, pageable).getContent();
        if (result.isEmpty()) {
            return null;
        }

        return result.get(0);
    }

    public Page<RegionDetail> getAllRegionByName(String query, Pageable pageable) {
        return regionDetailRepository.findAllByKoreanName(query, pageable);
    }

    public RegionDetail getRegionDetailByEnglishName(String englishName) {
        return regionDetailRepository.findByEnglishName(englishName)
                .orElseThrow(() -> new NotFoundException("region with that name not present"));
    }

    public Optional<RegionDetail> getRegionDetailById(Long regionDetailId) {
        return regionDetailRepository.findById(regionDetailId);
    }

}
