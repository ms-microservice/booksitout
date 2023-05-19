package com.jinkyumpark.forum.talk.commentlike;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentLikeCount {

    private Long commentId;
    private Integer positiveCount;
    private Integer negativeCount;

}