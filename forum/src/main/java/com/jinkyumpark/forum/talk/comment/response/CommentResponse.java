package com.jinkyumpark.forum.talk.comment.response;

import com.jinkyumpark.forum.talk.comment.CommentDto;
import com.jinkyumpark.forum.feign.response.AppUserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentResponse {

    private Long commentId;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private AppUserInfo appUserInfo;

    public static CommentResponse of(CommentDto commentDto, AppUserInfo appUserInfo) {
        return CommentResponse.builder()
                .commentId(commentDto.getCommentId())
                .content(commentDto.getContent())
                .createdDate(commentDto.getCreatedDate())
                .lastModifiedDate(commentDto.getLastModifiedDate())
                .appUserInfo(appUserInfo)
                .build();
    }

}