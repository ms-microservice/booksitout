package com.jinkyumpark.forum.tips;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TipsRepository extends JpaRepository<Tips, Long> {

    @Query("select t from Tips t where t.type = ?1")
    List<Tips> findByTipsType(Pageable pageable, TipsType tipsType);

}