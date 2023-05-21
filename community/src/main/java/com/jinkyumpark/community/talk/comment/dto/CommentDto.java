package com.jinkyumpark.community.talk.comment.dto;

import com.jinkyumpark.community.talk.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentDto {

    private Long commentId;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private Long appUserId;

    public static CommentDto of(Comment comment) {
        return CommentDto.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .createdDate(comment.getCreatedDate())
                .lastModifiedDate(comment.getLastModifiedDate())
                .appUserId(comment.getAppUserId())
                .build();
    }

}