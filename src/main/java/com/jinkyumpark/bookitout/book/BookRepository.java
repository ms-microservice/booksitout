package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("select b from Book b where b.appUser.appUserId = ?1 order by b.lastModified")
    Page<Book> findAllBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = ?1 and b.currentPage = 0 and b.isGiveUp = false order by b.lastModified desc")
    Page<Book> findAllNotStartedBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = ?1 and b.currentPage > 0 and b.currentPage < b.endPage and b.isGiveUp = false order by b.lastModified desc")
    Page<Book> findAllStartedBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = :appUserId and b.currentPage = b.endPage order by b.lastModified desc")
    Page<Book> findAllDoneBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = :appUserId and not b.currentPage = b.endPage and b.isGiveUp = false order by b.lastModified desc")
    Page<Book> findAllNotDoneBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = :appUserId and b.isGiveUp = true and b.currentPage < b.endPage order by b.lastModified desc")
    Page<Book> findAllGiveUpBooks(Long appUserId, Pageable pageRequest);
}