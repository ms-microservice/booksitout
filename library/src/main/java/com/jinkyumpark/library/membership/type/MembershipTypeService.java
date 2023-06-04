package com.jinkyumpark.library.membership.type;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MembershipTypeService {

    private final MembershipTypeRepository membershipTypeRepository;

    public Page<MembershipType> getMembershipTypeByQuery(String query, Pageable pageable) {
        return membershipTypeRepository.findByQuery(query, pageable);
    }

}
