package com.jinkyumpark.forum.talk.post.request;

import com.jinkyumpark.forum.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class PostEditRequest {

    private Long postId;
    private String title;
    private String content;

    public Post toEntity(Long postId, Long appUserId) {
        return Post.builder()
                .title(title)
                .content(content)
                .postId(postId)
                .appUserId(appUserId)
                .build();
    }

}
