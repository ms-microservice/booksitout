package com.jinkyumpark.community.talk.comment;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.post.postId = :postId")
    List<Comment> getAllCommentsByPostId(Long postId, Pageable pageable);

    @Query("select count(c) from Comment c where c.post.postId = :postId")
    int countAllCommentByPostId(Long postId);

}