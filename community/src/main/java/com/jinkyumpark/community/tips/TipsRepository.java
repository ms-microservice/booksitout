package com.jinkyumpark.community.tips;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TipsRepository extends JpaRepository<Tips, Long> {

    @Query("select t from Tips t")
    Page<Tips> findAllPaged(Pageable pageable);

    @Query("select t from Tips t where t.type = ?1")
    Page<Tips> findByTipsType(Pageable pageable, TipsType tipsType);

}