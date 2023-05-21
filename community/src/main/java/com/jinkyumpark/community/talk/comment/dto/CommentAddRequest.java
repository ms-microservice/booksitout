package com.jinkyumpark.community.talk.comment.dto;

import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentAddRequest {

    private String content;

    public Comment toEntity(Long appUserId, Long postId) {
        return Comment.builder()

                .content(content)
                .appUserId(appUserId)
                .post(Post.builder().postId(postId).build())

                .build();
    }

}
