package com.jinkyumpark.community.talk.comment.dto;

import com.jinkyumpark.community.talk.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentEditRequest {

    private String content;

    public Comment toEntity(Long appUserId, Long commentId) {
        return Comment.builder()
                .commentId(commentId)
                .appUserId(appUserId)
                .content(content)
                .build();
    }
}
