package com.jinkyumpark.library.region;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RegionService {

    private final RegionRepository regionRepository;
    private final RegionDetailRepository regionDetailRepository;

    public RegionDetail getRegionDetailByAddress(String address) {
        String[] split = address.split("\\W+");
        String region = split[0];
        String regionDetail = split[1];

        List<Region> regionList = regionRepository.findByKoreanName(region);
        Optional<RegionDetail> regionDetailOptional = regionList.get(0).getRegionDetailList().stream()
                .filter(r -> r.getKoreanName().contains(regionDetail))
                .findFirst();

        return regionDetailOptional.orElseGet(() -> regionDetailRepository.findById(1L).get());
    }

}
