package com.jinkyumpark.community.talk.commentlike;

import com.jinkyumpark.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor

@Service
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;

    public CommentLikeCount getCommentLikeCount(Long commentId) {
        int positiveCount = commentLikeRepository.countPositiveCommentLike(commentId);
        int negativeCount = commentLikeRepository.countNegativeCommentLike(commentId);

        return CommentLikeCount.builder()
                .commentId(commentId)
                .positiveCount(positiveCount)
                .negativeCount(negativeCount)
                .build();
    }

    public int getCommentScore(Long appUserId, Long commentId) {
        Optional<CommentLike> commentLike = commentLikeRepository.findByAppUserIdAndCommentId(appUserId, commentId);

        if (commentLike.isEmpty()) return 0;

        return commentLike.get().getScore();
    }

    @Transactional
    public CommentLike addCommentLike(CommentLike commentLike) {
        Optional<CommentLike> existingCommentLike = commentLikeRepository.findByAppUserIdAndCommentId(commentLike.getAppUserId(), commentLike.getComment().getCommentId());

        if (existingCommentLike.isPresent()) {
            existingCommentLike.get().updateScore(commentLike.getScore());
            return existingCommentLike.get();
        }

        return commentLikeRepository.save(commentLike);
    }

    @Transactional
    public void deleteCommentLike(Long appUserId, Long commentId) {
        CommentLike commentLike = commentLikeRepository.findByAppUserIdAndCommentId(appUserId, commentId)
                .orElseThrow(() -> new NotFoundException("댓글을 좋아요 하지 않으셨어요"));

        commentLikeRepository.deleteById(commentLike.getCommentLikeId());
    }

}
