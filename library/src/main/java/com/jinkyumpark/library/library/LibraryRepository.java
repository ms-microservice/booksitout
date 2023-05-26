package com.jinkyumpark.library.library;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LibraryRepository extends JpaRepository<Library, Long> {

    @Query("select l from Library l where l.name like concat('%', ?1, '%')")
    Page<Library> findAllByName(String name, Pageable pageable);

}
