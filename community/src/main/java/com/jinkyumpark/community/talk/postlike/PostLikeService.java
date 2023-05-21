package com.jinkyumpark.community.talk.postlike;

import com.jinkyumpark.common.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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

    public int getUserPostLike(Long appUserId, Long postId) {
        Optional<PostLike> postLike = postLikeRepository.findByAppUserIdAndPostId(appUserId, postId);
        if (postLike.isEmpty()) return 0;

        return postLike.get().getScore();
    }

    @Transactional
    public PostLike addPostLike(PostLike postLike) {
        Optional<PostLike> existingPostLike = postLikeRepository.findByAppUserIdAndPostId(postLike.getAppUserId(), postLike.getPost().getPostId());

        if (existingPostLike.isPresent()) {
            existingPostLike.get().updateScore(postLike.getScore());
            return existingPostLike.get();
        }

        return postLikeRepository.save(postLike);
    }

    @Transactional
    public void deletePostLike(Long appUserId, Long postId) {
        PostLike postLike = postLikeRepository.findByAppUserIdAndPostId(appUserId, postId)
                .orElseThrow(() -> new NoContentException("Not Present"));

        postLikeRepository.deleteById(postLike.getPostLikeId());
    }

}
