package com.jinkyumpark.community.gathering.join;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface GatheringJoinRepository extends JpaRepository<GatheringJoin, Long> {

    Page<GatheringJoin> findAllByGatheringId(Long gatheringId, Pageable pageable);
    Page<GatheringJoin> findAllByAppUserId(Long appUserId, Pageable pageable);

    @Query("select count(g) from GatheringJoin g where g.gatheringId = ?1")
    int countAllByGatheringId(Long gatheringId);

}
