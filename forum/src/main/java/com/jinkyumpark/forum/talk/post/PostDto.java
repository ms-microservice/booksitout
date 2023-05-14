package com.jinkyumpark.forum.talk.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostDto {

    private Long postId;
    private String title;
    private String content;

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    private Long isbn;
    private Long appUserId;

    public static PostDto of(Post post) {
        return PostDto.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .createdDate(post.getCreatedDate())
                .lastModifiedDate(post.getLastModifiedDate())
                .isbn(post.getIsbn())
                .appUserId(post.getAppUserId())
                .build();
    }

    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .isbn(isbn)
                .appUserId(appUserId)
                .build();
    }

}