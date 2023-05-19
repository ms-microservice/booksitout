package com.jinkyumpark.forum.talk.postlike;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;

    public PostLikeCount getPostLikeCount(Long postId) {
        int positiveLike = postLikeRepository.countPositiveLikeCount(postId);
        int negativeLike = postLikeRepository.countNegativeLikeCount(postId);

        return PostLikeCount.builder()
                .postId(postId)
                .positiveCount(positiveLike)
                .negativeCount(negativeLike)
                .build();
    }

}
