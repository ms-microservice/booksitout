package com.jinkyumpark.community.talk.post.dto;

import com.jinkyumpark.community.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class PostEditRequest {

    private String title;
    private String content;
    private Long isbn;

    public Post toEntity(Long postId, Long appUserId) {
        return Post.builder()
                .title(title)
                .content(content)
                .isbn(isbn)

                .postId(postId)
                .appUserId(appUserId)
                .build();
    }

}
