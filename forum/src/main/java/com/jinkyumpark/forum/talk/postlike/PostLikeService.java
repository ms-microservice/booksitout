package com.jinkyumpark.forum.talk.postlike;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;

    public int getPostLikeCount(Long postId) {
        return postLikeRepository.countAllPostLike(postId);
    }

}
