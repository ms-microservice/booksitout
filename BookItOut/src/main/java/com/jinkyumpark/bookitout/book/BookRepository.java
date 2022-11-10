package com.jinkyumpark.bookitout.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findAllByAppUser_AppUserId(Long appUserId, Pageable pageable);

    @Query("select b from Book b where b.appUser.appUserId = ?1 and b.currentPage = b.endPage")
    Page<Book> findAllDoneBook(Long appUserId, Pageable pageable);
}