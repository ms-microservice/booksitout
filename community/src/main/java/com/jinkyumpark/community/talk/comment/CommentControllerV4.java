package com.jinkyumpark.community.talk.comment;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.community.config.feign.UserClient;
import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import com.jinkyumpark.community.talk.comment.dto.CommentAddRequest;
import com.jinkyumpark.community.talk.comment.dto.CommentEditRequest;
import com.jinkyumpark.community.talk.comment.dto.CommentResponse;
import com.jinkyumpark.community.talk.commentlike.CommentLikeCount;
import com.jinkyumpark.community.talk.commentlike.CommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor

@RequestMapping("v4/forum")
@RestController
public class CommentControllerV4 {

    private final CommentService commentService;
    private final CommentLikeService commentLikeService;
    private final UserClient userClient;

    @GetMapping("post/{postId}/comments")
    public List<CommentResponse> getCommentsByPostId(@PathVariable("postId") Long postId,
                                                     @RequestParam(value = "user-id", required = false) Long appUserId,
                                                     @RequestParam(value = "page", required = false) Integer page,
                                                     @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 20;

        Pageable pageable = PageRequest.of(page - 1, size);

        return commentService
                .getCommentsByPostId(postId, pageable).stream()
                .map(comment -> CommentResponse.of(
                                comment,
                                userClient.getPublicUserByAppUserId(comment.getAppUserId()),
                                commentLikeService.getCommentLikeCount(comment.getCommentId()),
                                appUserId == null || appUserId == 0 ? 0 : commentLikeService.getCommentScore(appUserId, comment.getCommentId())
                        )
                )
                .collect(Collectors.toList());
    }

    @PostMapping("post/{postId}/comment")
    public AddSuccessResponse addComment(@LoginUser User user,
                                         @PathVariable("postId") Long postId,
                                         @RequestBody @Valid CommentAddRequest commentAddRequest) {
        Comment comment = commentService.addComment(commentAddRequest.toEntity(user.getId(), postId));
        AppUserInfo publicUserInfo = userClient.getPublicUserByAppUserId(user.getId());
        CommentLikeCount commentLikeCount = CommentLikeCount.builder()
                .positiveCount(0)
                .negativeCount(0)
                .build();

        return AddSuccessResponse.builder()
                .id(comment.getCommentId())
                .added(CommentResponse.of(comment, publicUserInfo, commentLikeCount, 0))

                .message("댓글을 추가했어요")
                .build();
    }

    @PutMapping("comment/{commentId}")
    public UpdateSuccessResponse updateComment(@LoginUser User user,
                                               @PathVariable("commentId") Long commentId,
                                               @RequestBody @Valid CommentEditRequest commentEditRequest) {
        Comment comment = commentService.updateComment(commentEditRequest.toEntity(user.getId(), commentId));

        return UpdateSuccessResponse.builder()
                .id(comment.getCommentId())
                .message("댓글을 수정했어요")
                .build();
    }

    @DeleteMapping("comment/{commentId}")
    public DeleteSuccessResponse deleteComment(@LoginUser User user,
                                               @PathVariable("commentId") Long commentId) {
        commentService.deleteComment(user.getId(), commentId);

        return DeleteSuccessResponse.builder()
                .id(commentId)
                .message("댓글을 삭제했어요")
                .build();
    }

}
