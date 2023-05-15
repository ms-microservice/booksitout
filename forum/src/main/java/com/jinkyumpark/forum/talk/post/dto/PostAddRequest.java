package com.jinkyumpark.forum.talk.post.dto;

import com.jinkyumpark.forum.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostAddRequest {

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotNull
    private Long isbn;

    public Post toEntity(Long appUserId) {
        return Post.builder()
                .title(title)
                .content(content)
                .isbn(isbn)
                .appUserId(appUserId)
                .build();
    }

}
