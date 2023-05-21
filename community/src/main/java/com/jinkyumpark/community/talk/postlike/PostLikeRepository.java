package com.jinkyumpark.community.talk.postlike;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    @Query("select count(pl) from PostLike pl where pl.post.postId=:postId")
    int countAllPostLike(Long postId);

    @Query("select count(pl) from PostLike pl where pl.post.postId=:postId and pl.score = 1")
    int countPositiveLikeCount(Long postId);

    @Query("select count(pl) from PostLike pl where pl.post.postId=:postId and pl.score = -1")
    int countNegativeLikeCount(Long postId);

    @Query("select pl from PostLike pl where pl.appUserId = :appUserId and pl.post.postId=:postId")
    Optional<PostLike> findByAppUserIdAndPostId(Long appUserId, Long postId);

}