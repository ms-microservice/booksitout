package com.jinkyumpark.library.membership.type;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MembershipTypeRepository extends JpaRepository<MembershipType, Long> {

    @Query("SELECT DISTINCT mt FROM MembershipType mt " +
            "LEFT JOIN mt.region r " +
            "LEFT JOIN mt.regionDetail rd " +
            "WHERE LOWER(mt.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "(r.koreanName IS NOT NULL AND LOWER(r.koreanName) LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
            "(rd.koreanName IS NOT NULL AND LOWER(rd.koreanName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<MembershipType> findByQuery(String query, Pageable pageable);

    @Query("SELECT m from MembershipType m where m.region.regionId = :regionId")
    Optional<MembershipType> findByRegionId(Long regionId);

    @Query("SELECT m from MembershipType m where m.regionDetail.regionDetailId = :regionDetailId")
    Optional<MembershipType> findByRegionDetailId(Long regionDetailId);

}
