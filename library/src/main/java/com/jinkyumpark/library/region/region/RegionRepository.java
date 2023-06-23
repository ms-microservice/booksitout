package com.jinkyumpark.library.region.region;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RegionRepository extends JpaRepository<Region, Long> {

    @Query("select r from Region r where r.koreanName like %?1%")
    List<Region> findByKoreanName(String koreanName);

    @Query("select r from Region r where r.englishName like %?1%")
    List<Region> findByEnglishName(String englishName);

    @Query("select r from Region r where r.koreanName like %?1%")
    Page<Region> findAllByKoreanName(String koreanName, Pageable pageable);

}
