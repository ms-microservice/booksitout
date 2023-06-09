package com.jinkyumpark.library.membership.type;

import com.jinkyumpark.library.region.region.Region;
import com.jinkyumpark.library.region.regionDetail.RegionDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MembershipTypeService {

    private final MembershipTypeRepository membershipTypeRepository;

    public Page<MembershipType> getMembershipTypeByQuery(String query, Pageable pageable) {
        return membershipTypeRepository.findByQuery(query, pageable);
    }

    public Optional<MembershipType> getByRegion(Region region) {
        return membershipTypeRepository.findByRegionId(region.getRegionId());
    }

    public Optional<MembershipType> getByRegionDetail(RegionDetail regionDetail) {
        return membershipTypeRepository.findByRegionDetailId(regionDetail.getRegionDetailId());
    }

}
