package com.jinkyumpark.bookitout.repository;

import com.jinkyumpark.bookitout.model.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {
    @Query("select q from Quotation q where q.book.bookId = ?1")
    List<Quotation> findAllByBook_BookId(Long bookId);
}
