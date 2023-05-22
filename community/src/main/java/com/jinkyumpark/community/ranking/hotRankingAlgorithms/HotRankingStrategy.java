package com.jinkyumpark.community.ranking.hotRankingAlgorithms;

import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.commentlike.CommentLike;
import com.jinkyumpark.community.talk.post.Post;
import com.jinkyumpark.community.talk.postlike.PostLike;

import java.util.List;

public interface HotRankingStrategy {

    int calculate(Post post, List<PostLike> postLikes, List<Comment> comments, List<CommentLike> commentLikes);

}

