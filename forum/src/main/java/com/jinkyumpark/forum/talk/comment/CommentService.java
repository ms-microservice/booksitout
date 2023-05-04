package com.jinkyumpark.forum.talk.comment;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public List<CommentDto> getCommentsByPostId(Long postId, Pageable pageable) {
        return commentRepository.getAllCommentsByPostId(postId, pageable).stream()
                .map(CommentDto::of)
                .collect(Collectors.toList());
    }

    public int getCommentCountByPostId(Long postId) {
        return commentRepository.countAllCommentByPostId(postId);
    }

    public Long addComment(Comment comment) {
        return commentRepository.save(comment).getCommentId();
    }

    public Comment updateComment(Comment updatedComment) {
        Comment comment = commentRepository.findById(updatedComment.getCommentId())
                .orElseThrow(() -> new NotFoundException("수정하려는 댓글이 없어요"));

        if (comment.getAppUserId() != updatedComment.getAppUserId())
            throw new UnauthorizedException("자신의 댓글만 수정할 수 있어요");

        comment.updateComment(updatedComment);

        return comment;
    }

    public void deleteComment(Long appUserId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("지울려는 댓글이 없어요"));

        if (comment.getAppUserId() != appUserId)
            throw new UnauthorizedException("자신의 댓글만 지울 수 있어요");

        commentRepository.deleteById(commentId);
    }

}
