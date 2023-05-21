package com.jinkyumpark.community.talk.post.dto;

import com.jinkyumpark.community.config.feign.response.BookInfo;
import com.jinkyumpark.community.config.feign.response.PublicUserInfo;
import com.jinkyumpark.community.talk.post.PostDto;
import com.jinkyumpark.community.talk.postlike.PostLikeCount;
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

    private Integer likeCount;
    private Integer dislikeCount;
    private Integer userLikeScore;

    private Integer commentCount;

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    private PublicUserInfo user;
    private BookInfo book;

    public static PostResponse of(PostDto postDto, PublicUserInfo appUserInfo, BookInfo bookInfo, PostLikeCount postLikeCount, int commentCount, int userLikeScore) {
        return PostResponse.builder()
                .postId(postDto.getPostId())
                .title(postDto.getTitle())
                .content(postDto.getContent())

                .createdDate(postDto.getCreatedDate())
                .lastModifiedDate(postDto.getLastModifiedDate())

                .likeCount(postLikeCount.getPositiveCount())
                .dislikeCount(postLikeCount.getNegativeCount())
                .userLikeScore(userLikeScore)
                .commentCount(commentCount)

                .book(bookInfo)
                .user(appUserInfo)

                .build();
    }

}