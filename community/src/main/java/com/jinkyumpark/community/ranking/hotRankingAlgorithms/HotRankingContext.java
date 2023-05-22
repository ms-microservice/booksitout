package com.jinkyumpark.community.ranking.hotRankingAlgorithms;

import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.commentlike.CommentLike;
import com.jinkyumpark.community.talk.post.Post;
import com.jinkyumpark.community.talk.postlike.PostLike;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HotRankingContext {

    private HotRankingStrategy hotRankingStrategy = new HotRankingOnlyFavorActivityStrategy();

    private void setStrategy(HotRankingStrategy strategy) {
        this.hotRankingStrategy = strategy;
    }

    public int calculateScore(Post post, List<PostLike> postLikeList, List<Comment> commentList, List<CommentLike> commentLikeList) {
        return hotRankingStrategy.calculate(post, postLikeList, commentList, commentLikeList);
    }

}

