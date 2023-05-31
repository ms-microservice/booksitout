package com.jinkyumpark.library.region;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RegionDetailRepository extends JpaRepository<RegionDetail, Long> {

    @Query("select r from RegionDetail r where r.koreanName like concat('%', :koreanName, '%') ")
    Page<RegionDetail> findAllByKoreanName(String koreanName, Pageable pageable);

    @Query("select r from RegionDetail r where r.englishName = ?1")
    Optional<RegionDetail> findByEnglishName(String englishName);

}
