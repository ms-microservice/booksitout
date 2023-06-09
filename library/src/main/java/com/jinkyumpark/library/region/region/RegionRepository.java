package com.jinkyumpark.library.region.region;

import com.jinkyumpark.library.region.region.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RegionRepository extends JpaRepository<Region, Long> {

    @Query("select r from Region r where r.koreanName like %?1%")
    List<Region> findByKoreanName(String koreanName);

}
