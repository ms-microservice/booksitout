package com.jinkyumpark.community.talk.commentlike;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor

@RestController
@RequestMapping("v4/forum/comment/like")
public class CommentLikeControllerV4 {

    private final CommentLikeService commentLikeService;

    @PostMapping("{commentId}")
    public AddSuccessResponse addCommentLike(@LoginUser User loginUser,
                                             @PathVariable("commentId") Long commentId,
                                             @RequestParam(value = "score", required = false) Integer score) {
        if (score == null) score = 1;

        CommentLikeDto commentLikeDto = CommentLikeDto.builder()
                .score(score)
                .commentId(commentId)
                .appUserId(loginUser.getId())
                .build();

        Long commentLikeId = commentLikeService.addCommentLike(commentLikeDto.toEntity()).getCommentLikeId();

        return AddSuccessResponse.builder()
                .id(commentLikeId)
                .message("댓글을 좋아요 했어요")
                .build();
    }

    @DeleteMapping("{commentId}")
    public DeleteSuccessResponse deleteCommentLike(@LoginUser User loginUser,
                                                   @PathVariable("commentId") Long commentId) {
        commentLikeService.deleteCommentLike(loginUser.getId(), commentId);

        return DeleteSuccessResponse.builder()
                .message("좋아요/싫어요를 지웠어요")
                .build();
    }

}