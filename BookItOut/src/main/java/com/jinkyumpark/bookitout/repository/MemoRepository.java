package com.jinkyumpark.bookitout.repository;

import com.jinkyumpark.bookitout.model.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long> {
    @Query("select m from Memo m where m.book.bookId = ?1")
    List<Memo> findAllMemoByBookId(Long bookId);
}
