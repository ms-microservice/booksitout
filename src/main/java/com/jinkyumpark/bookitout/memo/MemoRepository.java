package com.jinkyumpark.bookitout.memo;

import com.jinkyumpark.bookitout.memo.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    @Query("select m from Memo m where m.book.bookId = ?1")
    List<Memo> findAllMemoByBookId(Long bookId);
}
