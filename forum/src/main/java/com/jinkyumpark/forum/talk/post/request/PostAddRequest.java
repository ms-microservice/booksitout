package com.jinkyumpark.forum.talk.post.request;

import com.jinkyumpark.forum.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostAddRequest {

    private String title;
    private String content;

    public Post toEntity(Long appUserId) {
        return Post.builder()
                .title(title)
                .content(content)
                .appUserId(appUserId)
                .build();
    }

}
