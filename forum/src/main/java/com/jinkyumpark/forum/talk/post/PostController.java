package com.jinkyumpark.forum.talk.post;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.forum.loginUser.LoginUser;
import com.jinkyumpark.forum.loginUser.User;
import com.jinkyumpark.forum.talk.post.request.PostAddRequest;
import com.jinkyumpark.forum.talk.post.request.PostEditRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("forum/v4/post")
@RestController
public class PostController {

    private final PostService postService;

    @GetMapping("{postId}")
    public PostDto getPostByPostId(@PathVariable("postId") Long postId) {
        return postService.getPostByPostId(postId);
    }

    @GetMapping
    public List<PostDto> getPostByIsbn(@RequestParam("isbn") Integer isbn,
                                       @RequestParam("page") Integer page,
                                       @RequestParam("size") Integer size
    ) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page, size);

        return postService.getPostByIsbn(isbn, pageable);
    }

    @PostMapping
    public AddSuccessResponse addPost(@LoginUser User user,
                                      @RequestBody @Valid PostAddRequest postAddRequest) {
        Long postId = postService.addPost(postAddRequest.toEntity(user.getId()));

        return AddSuccessResponse.builder()
                .id(postId)
                .message("게시글을 추가했어요")
                .build();
    }

    @PutMapping("{postId}")
    public UpdateSuccessResponse updatePost(@LoginUser User user,
                                            @PathVariable("postId") Long postId,
                                            @RequestParam @Valid PostEditRequest postEditRequest) {

        Post post = postService.updatePost(postEditRequest.toEntity(postId, user.getId()));

        return UpdateSuccessResponse.builder()
                .id(post.getPostId())
                .message("게시글을 수정했어요")
                .build();
    }

    @DeleteMapping("{postId}")
    public DeleteSuccessResponse deletePost(@LoginUser User user,
                                            @PathVariable("postId") Long postId) {
        postService.deletePost(postId, user.getId());

        return DeleteSuccessResponse.builder().build();
    }

}
