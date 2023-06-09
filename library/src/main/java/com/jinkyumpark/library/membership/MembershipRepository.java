package com.jinkyumpark.library.membership;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MembershipRepository extends JpaRepository<Membership, Long> {

    @Query("select l from Membership l where l.appUserId = ?1")
    Page<Membership> findAllByAppUserId(Long appUserId, Pageable pageable);

}
