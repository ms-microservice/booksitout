package com.jinkyumpark.bookitout.app.book;

import com.jinkyumpark.bookitout.app.book.model.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("select b from Book b where b.appUser.appUserId = ?1")
    List<Book> findAllBooksByAppUserId(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = :appUserId and b.currentPage = b.endPage")
    List<Book> findAllDoneBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = :appUserId and b.isGiveUp = true")
    List<Book> findAllGiveUpBooks(Long appUserId, Pageable pageRequest);

    @Query("select b from Book b where b.appUser.appUserId = :appUserId and not b.currentPage = b.endPage")
    List<Book> findAllNotDoneBooks(Long appUserId, Pageable pageRequest);
}