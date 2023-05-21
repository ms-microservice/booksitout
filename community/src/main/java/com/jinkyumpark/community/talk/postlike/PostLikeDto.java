package com.jinkyumpark.community.talk.postlike;

import com.jinkyumpark.community.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostLikeDto {

    private Integer score;
    private Long postId;
    private Long appUserId;

    public PostLike toEntity() {
        return PostLike.builder()
                .score(score)
                .post(Post.builder().postId(postId).build())
                .appUserId(appUserId)
                .build();
    }

}
