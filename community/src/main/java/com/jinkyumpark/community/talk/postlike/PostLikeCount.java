package com.jinkyumpark.community.talk.postlike;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostLikeCount {

    private Long postId;
    private Integer positiveCount;
    private Integer negativeCount;

}