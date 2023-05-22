package com.jinkyumpark.community.talk.commentlike;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    @Query("select c from CommentLike c where c.appUserId = ?1 and c.comment.commentId = ?2")
    Optional<CommentLike> findByAppUserIdAndCommentId(Long appUserId, Long commentId);

    @Query("select count(c) from CommentLike c where c.comment.commentId = ?1 and c.score = 1")
    int countPositiveCommentLike(Long commentId);

    @Query("select count(c) from CommentLike c where c.comment.commentId = ?1 and c.score = -1")
    int countNegativeCommentLike(Long commentId);

    @Query("select c from CommentLike c where c.comment.commentId = ?1")
    List<CommentLike> findAllByCommentId(Long commentId);

}
