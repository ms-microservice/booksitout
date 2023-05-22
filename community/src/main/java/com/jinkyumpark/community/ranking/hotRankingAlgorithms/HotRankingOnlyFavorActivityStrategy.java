package com.jinkyumpark.community.ranking.hotRankingAlgorithms;

import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.commentlike.CommentLike;
import com.jinkyumpark.community.talk.post.Post;
import com.jinkyumpark.community.talk.postlike.PostLike;

import java.util.List;

public class HotRankingOnlyFavorActivityStrategy implements HotRankingStrategy {

    private static final double postLikeWeight = 1.0;
    private static final double commentWeight = 1.0;
    private static final double commentLikeWeight = 1.0;

    @Override
    public int calculate(Post post, List<PostLike> postLikes, List<Comment> comments, List<CommentLike> commentLikes) {
        int postLikeScore = calculatePostLikeScore(postLikes);
        int commentScore = calculateCommentScore(comments);
        int commentLikeScore = calculateCommentLikeScore(commentLikes);

        double weightedPostLikeScore = postLikeScore * postLikeWeight;
        double weightedCommentScore = commentScore * commentWeight;
        double weightedCommentLikeScore = commentLikeScore * commentLikeWeight;

        return (int) (weightedPostLikeScore + weightedCommentScore + weightedCommentLikeScore);
    }

    private int calculatePostLikeScore(List<PostLike> postLikeList) {
        final int likeScore = 4;
        final int dislikeScore = 2;

        return postLikeList.stream()
                .map(PostLike::getScore)
                .map(like -> like == 1 ? likeScore : dislikeScore)
                .mapToInt(Integer::intValue)
                .sum();
    }

    private int calculateCommentScore(List<Comment> commentList) {
        final int sincereCommentCriteria = 20;
        final int usualCommentScore = 4;
        final int sincereCommentScore = 8;

        return commentList.stream()
                .map(Comment::getContent)
                .map(content -> content.length() > sincereCommentCriteria)
                .mapToInt(isSincere -> isSincere ? sincereCommentScore : usualCommentScore)
                .sum();
    }

    private int calculateCommentLikeScore(List<CommentLike> commentLikeList) {
        final int likeScore = 2;
        final int dislikeScore = 1;

        return commentLikeList.stream()
                .map(CommentLike::getScore)
                .mapToInt(score -> score == 1 ? likeScore : dislikeScore)
                .sum();
    }

}
