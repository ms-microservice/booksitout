package com.jinkyumpark.forum.talk.post;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.forum.feign.BookClient;
import com.jinkyumpark.forum.feign.response.BookInfo;
import com.jinkyumpark.forum.loginUser.LoginUser;
import com.jinkyumpark.forum.loginUser.User;
import com.jinkyumpark.forum.talk.comment.CommentService;
import com.jinkyumpark.forum.talk.post.request.PostAddRequest;
import com.jinkyumpark.forum.talk.post.request.PostEditRequest;
import com.jinkyumpark.forum.talk.post.response.PostResponse;
import com.jinkyumpark.forum.talk.postlike.PostLikeService;
import com.jinkyumpark.forum.feign.AppUserClient;
import com.jinkyumpark.forum.feign.response.AppUserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("v4/forum/post")
@RestController
public class PostControllerV4 {

    private final PostService postService;
    private final PostLikeService postLikeService;
    private final CommentService commentService;

    private final AppUserClient appUserClient;
    private final BookClient bookClient;

    @GetMapping("{postId}")
    public PostResponse getPostByPostId(@PathVariable("postId") Long postId) {
        PostDto postDto = postService.getPostByPostId(postId);

        int likeCount = postLikeService.getPostLikeCount(postId);
        int commentCount = commentService.getCommentCountByPostId(postId);

        AppUserInfo appUserInfo = appUserClient.getUserInfoByUserId(postDto.getAppUserId());
        BookInfo bookInfo = bookClient.getBookInfoByIsbn(postDto.getIsbn());

        return PostResponse.of(postDto, appUserInfo, bookInfo, likeCount, commentCount);
    }

    @GetMapping
    public List<PostResponse> getPostByIsbn(@RequestParam("isbn") Integer isbn,
                                            @RequestParam("page") Integer page,
                                            @RequestParam("size") Integer size
    ) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page, size);

        return postService.getPostByIsbn(isbn, pageable).stream()
                .map(postDto -> PostResponse.of(
                                    postDto,
                                    appUserClient.getUserInfoByUserId(postDto.getAppUserId()),
                                    bookClient.getBookInfoByIsbn(postDto.getIsbn()),
                                    postLikeService.getPostLikeCount(postDto.getPostId()),
                                    commentService.getCommentCountByPostId(postDto.getPostId()
                                )
                        )
                )
                .collect(Collectors.toList());
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
