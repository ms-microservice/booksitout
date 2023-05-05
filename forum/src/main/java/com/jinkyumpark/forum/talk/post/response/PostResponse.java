package com.jinkyumpark.forum.talk.post.response;

import com.jinkyumpark.forum.feign.response.BookInfo;
import com.jinkyumpark.forum.talk.post.PostDto;
import com.jinkyumpark.forum.feign.response.AppUserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostResponse {

    private Long postId;
    private String title;
    private String content;


    private Integer postLikeCount;
    private Integer commentCount;

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    private AppUserInfo user;
    private BookInfo book;

    public static PostResponse of(PostDto postDto, AppUserInfo appUserInfo, BookInfo bookInfo, int postLikeCount, int commentCount) {
        return PostResponse.builder()
                .postId(postDto.getPostId())
                .title(postDto.getTitle())
                .content(postDto.getContent())

                .createdDate(postDto.getCreatedDate())
                .lastModifiedDate(postDto.getLastModifiedDate())

                .postLikeCount(postLikeCount)
                .commentCount(commentCount)

                .book(bookInfo)
                .user(appUserInfo)

                .build();
    }

}