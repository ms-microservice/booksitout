package com.jinkyumpark.bookitout.qna;

import com.jinkyumpark.bookitout.qna.Qna;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface QnaRepository extends PagingAndSortingRepository<Qna, Long> {
    @Query("select q from Qna q where q.appUser.appUserId = ?1")
    List<Qna> findAllByAppUser_AppUserId(Long appUserId);
}
