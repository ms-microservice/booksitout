package com.jinkyumpark.forum.talk.commentlike;

import com.jinkyumpark.forum.talk.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentLikeDto {

    private Integer score;
    private Long commentId;
    private Long appUserId;

    public CommentLike toEntity() {
        return CommentLike.builder()
                .score(score)
                .comment(Comment.builder().commentId(commentId).build())
                .appUserId(appUserId)
                .build();
    }
}