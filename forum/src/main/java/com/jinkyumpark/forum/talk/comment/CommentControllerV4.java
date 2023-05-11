package com.jinkyumpark.forum.talk.comment;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.forum.loginUser.LoginUser;
import com.jinkyumpark.forum.loginUser.User;
import com.jinkyumpark.forum.talk.comment.request.CommentAddRequest;
import com.jinkyumpark.forum.talk.comment.request.CommentEditRequest;
import com.jinkyumpark.forum.talk.comment.response.CommentResponse;
import com.jinkyumpark.forum.feign.AppUserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor

@RequestMapping("v4/forum/comment")
@RestController
public class CommentControllerV4 {

    private final CommentService commentService;
    private final AppUserClient appUserClient;

    @GetMapping
    public List<CommentResponse> getCommentByPostId(@RequestParam("post") Long postId,
                                                    @RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 20;

        Pageable pageable = PageRequest.of(page - 1, size);

        return commentService
                .getCommentsByPostId(postId, pageable).stream()
                .map(commentDto -> CommentResponse.of(commentDto, appUserClient.getUserInfoByUserId(commentDto.getAppUserId())))
                .collect(Collectors.toList());
    }

    @PostMapping
    public AddSuccessResponse addComment(@LoginUser User user,
                                         @RequestBody @Valid CommentAddRequest commentAddRequest) {
        Long commentId = commentService.addComment(commentAddRequest.toEntity(user.getId()));

        return AddSuccessResponse.builder()
                .id(commentId)
                .message("댓글을 추가했어요")
                .build();
    }

    @PutMapping("{commentId}")
    public UpdateSuccessResponse updateComment(@LoginUser User user,
                                               @PathVariable("commentId") Long commentId,
                                               @RequestBody @Valid CommentEditRequest commentEditRequest) {
        Comment comment = commentService.updateComment(commentEditRequest.toEntity(user.getId(), commentId));

        return UpdateSuccessResponse.builder()
                .id(comment.getCommentId())
                .message("댓글을 수정했어요")
                .build();
    }

    @DeleteMapping("{commentId}")
    public DeleteSuccessResponse deleteComment(@LoginUser User user,
                                               @PathVariable("commentId") Long commentId) {
        commentService.deleteComment(user.getId(), commentId);

        return DeleteSuccessResponse.builder()
                .id(commentId)
                .message("댓글을 삭제했어요")
                .build();
    }

}