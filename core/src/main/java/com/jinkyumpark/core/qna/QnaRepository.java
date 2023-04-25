package com.jinkyumpark.core.qna;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface QnaRepository extends PagingAndSortingRepository<Qna, Long> {
    @Query("select q from Qna q where q.appUserId.appUserId = ?1")
    List<Qna> findAllByAppUser_AppUserId(Long appUserId);
}
