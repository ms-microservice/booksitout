package com.jinkyumpark.library.membership;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LibraryMembershipRepository extends JpaRepository<LibraryMembership, Long> {

    @Query("select l from LibraryMembership l where l.appUserId = ?1")
    Page<LibraryMembership> findAllByAppUserId(Long appUserId, Pageable pageable);

}
