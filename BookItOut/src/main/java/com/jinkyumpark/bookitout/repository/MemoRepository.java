package com.jinkyumpark.bookitout.repository;

import com.jinkyumpark.bookitout.model.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    @Query("select m from Memo m where m.book.bookId = ?1")
    List<Memo> findAllMemoByBookId(Long bookId);
}
