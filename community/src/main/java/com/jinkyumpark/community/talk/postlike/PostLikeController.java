package com.jinkyumpark.community.talk.postlike;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("v4/forum/post/like")
public class PostLikeController {

    private final PostLikeService postLikeService;

    @PostMapping("{postId}")
    public AddSuccessResponse addCommentLike(@LoginUser User loginUser,
                                             @PathVariable("postId") Long postId,
                                             @RequestParam(value = "score", required = false) Integer score) {
        if (score == null) score = 1;

        PostLikeDto postLikeDto = PostLikeDto.builder()
                .score(score)
                .postId(postId)
                .appUserId(loginUser.getId())
                .build();

        Long postLikeId = postLikeService.addPostLike(postLikeDto.toEntity()).getPostLikeId();

        return AddSuccessResponse.builder()
                .id(postLikeId)
                .build();
    }

    @DeleteMapping("{postId}")
    public DeleteSuccessResponse deleteCommentLike(@LoginUser User loginUser,
                                                   @PathVariable("postId") Long postId) {
        postLikeService.deletePostLike(loginUser.getId(), postId);

        return DeleteSuccessResponse.builder().build();
    }

}
