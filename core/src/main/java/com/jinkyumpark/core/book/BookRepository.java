package com.jinkyumpark.core.book;

import com.jinkyumpark.core.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("select b from Book b where b.appUserId = ?1 order by b.lastModifiedDate")
    Page<Book> findAllBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUserId = :appUserId and (b.title like %:query% or b.author like %:query%)")
    List<Book> findAllByQuery(Long appUserId, String query);

    @Query("select b from Book b where b.appUserId = ?1 and b.currentPage = 0 and (b.isGiveUp is null OR b.isGiveUp = true) order by b.lastModifiedDate desc")
    Page<Book> findAllNotStartedBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUserId = ?1 and b.currentPage > 0 and b.currentPage < b.endPage and (b.isGiveUp is null OR b.isGiveUp = false) order by b.lastModifiedDate desc")
    Page<Book> findAllStartedBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUserId = :appUserId and b.currentPage >= b.endPage order by b.lastModifiedDate desc")
    Page<Book> findAllDoneBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUserId = :appUserId and b.currentPage < b.endPage and (b.isGiveUp is null OR b.isGiveUp = false) order by b.lastModifiedDate desc")
    Page<Book> findAllNotDoneBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUserId = :appUserId and b.isGiveUp = true and b.currentPage < b.endPage order by b.lastModifiedDate desc")
    Page<Book> findAllGiveUpBooks(Long appUserId, Pageable pageRequest);
}