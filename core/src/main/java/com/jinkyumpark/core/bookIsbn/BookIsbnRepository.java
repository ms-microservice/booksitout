package com.jinkyumpark.core.bookIsbn;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookIsbnRepository extends JpaRepository<BookIsbn, Long> {

    Optional<BookIsbn> findByIsbn(String isbn13);

}