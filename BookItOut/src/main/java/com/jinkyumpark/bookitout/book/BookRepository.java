package com.jinkyumpark.bookitout.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByAppUser_AppUserId(Long appUserId);

    @Query("select b from Book b where b.appUser.appUserId = ?1 and b.currentPage = b.endPage")
    List<Book> findAllDoneBook(Long appUserId);

    @Query("select b from Book b where b.appUser.appUserId = ?1 and not b.currentPage = b.endPage")
    List<Book> findAllNotDoneBook(Long appUserId);
}