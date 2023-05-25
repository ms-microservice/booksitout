package com.jinkyumpark.community.gathering;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GatheringRepository extends JpaRepository<Gathering, Long> {

    @Query("select g from Gathering g where g.type = ?1")
    Page<Gathering> findAllByType(GatheringType type, Pageable pageable);

    @Query("select g from Gathering g")
    Page<Gathering> findAllGathering(Pageable pageable);

}
