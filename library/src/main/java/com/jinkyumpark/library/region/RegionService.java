package com.jinkyumpark.library.region;

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

    public Page<RegionDetail> getAllRegionByName(String query, Pageable pageable) {
        return regionDetailRepository.findAllByKoreanName(query, pageable);
    }

}
