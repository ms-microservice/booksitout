package com.jinkyumpark.bookitout.app.qna;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaRepository extends PagingAndSortingRepository<Qna, Long> {
}
