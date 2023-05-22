package com.jinkyumpark.community.gathering;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GatheringRepository extends JpaRepository<Gathering, Long> {

    @Query("select g from Gathering g where g.type = ?1")
    List<Gathering> findAllByType(GatheringType type, Pageable pageable);

}
