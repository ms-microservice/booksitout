package com.jinkyumpark.community.talk.comment.dto;

import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.commentlike.CommentLikeCount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentResponse {

    private Long commentId;

    private String content;

    private AppUserInfo user;

    private Integer likeCount;
    private Integer dislikeCount;
    private Integer userLikeScore;

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    public static CommentResponse of(CommentDto commentDto, AppUserInfo publicUserInfo, CommentLikeCount commentLikeCount, int userLikeScore) {
        return CommentResponse.builder()
                .commentId(commentDto.getCommentId())

                .content(commentDto.getContent())

                .user(publicUserInfo)

                .likeCount(commentLikeCount.getPositiveCount())
                .dislikeCount(commentLikeCount.getNegativeCount())
                .userLikeScore(userLikeScore)

                .createdDate(commentDto.getCreatedDate())
                .lastModifiedDate(commentDto.getLastModifiedDate())
                .build();
    }

    public static CommentResponse of(Comment comment, AppUserInfo publicUserInfo, CommentLikeCount commentLikeCount, int userLikeScore) {
        return CommentResponse.builder()
                .commentId(comment.getCommentId())

                .content(comment.getContent())

                .user(publicUserInfo)

                .likeCount(commentLikeCount.getPositiveCount())
                .dislikeCount(commentLikeCount.getNegativeCount())
                .userLikeScore(userLikeScore)

                .createdDate(comment.getCreatedDate())
                .lastModifiedDate(comment.getLastModifiedDate())

                .build();
    }

}