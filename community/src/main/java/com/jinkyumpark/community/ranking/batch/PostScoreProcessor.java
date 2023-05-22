package com.jinkyumpark.community.ranking.batch;

import com.jinkyumpark.community.ranking.hotRankingAlgorithms.HotRankingContext;
import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.comment.CommentRepository;
import com.jinkyumpark.community.talk.commentlike.CommentLike;
import com.jinkyumpark.community.talk.commentlike.CommentLikeRepository;
import com.jinkyumpark.community.talk.post.Post;
import com.jinkyumpark.community.talk.postlike.PostLike;
import com.jinkyumpark.community.talk.postlike.PostLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class PostScoreProcessor implements ItemProcessor<Post, Post> {

    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;

    private final HotRankingContext hotRankingContext;

    @Override
    public Post process(Post item) {
        List<PostLike> postLikeList = postLikeRepository.findAllByPostId(item.getPostId());

        List<Comment> commentList = commentRepository.getAllCommentsByPostId(item.getPostId(), Pageable.unpaged());

        List<CommentLike> commentLikeList = commentList.stream()
                .map(Comment::getCommentId)
                .map(commentLikeRepository::findAllByCommentId)
                .flatMap(List::stream)
                .collect(Collectors.toList());

        int score = hotRankingContext.calculateScore(item, postLikeList, commentList, commentLikeList);

        return Post.builder()
                .postId(item.getPostId())
                .title(item.getTitle())
                .content(item.getContent())
                .isbn(item.getIsbn())
                .appUserId(item.getAppUserId())
                .score(score)
                .build();
    }

}

