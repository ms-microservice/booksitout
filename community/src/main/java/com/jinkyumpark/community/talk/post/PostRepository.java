package com.jinkyumpark.community.talk.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByIsbn(Long isbn, Pageable pageable);

    @Query("select p from Post p")
    List<Post> findAllOrderByPopular(Pageable pageable);

    @Query("select p from Post p where p.appUserId = ?1")
    List<Post> findAllByAppUserId(Long appUserId, Pageable pageable);

    @Query("select p from Post p where p.appUserId = ?1")
    Page<Post> findAllByAppUserIdPaged(Long appUserId, Pageable pageable);

}
