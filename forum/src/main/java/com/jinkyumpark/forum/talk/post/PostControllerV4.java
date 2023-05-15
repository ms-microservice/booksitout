package com.jinkyumpark.forum.talk.post;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.forum.config.feign.BookClient;
import com.jinkyumpark.forum.config.feign.response.BookInfo;
import com.jinkyumpark.forum.config.security.loginUser.LoginUser;
import com.jinkyumpark.forum.config.security.loginUser.User;
import com.jinkyumpark.forum.talk.comment.CommentService;
import com.jinkyumpark.forum.talk.post.dto.PostAddRequest;
import com.jinkyumpark.forum.talk.post.dto.PostEditRequest;
import com.jinkyumpark.forum.talk.post.dto.PostSort;
import com.jinkyumpark.forum.talk.post.dto.PostResponse;
import com.jinkyumpark.forum.talk.postlike.PostLikeCount;
import com.jinkyumpark.forum.talk.postlike.PostLikeService;
import com.jinkyumpark.forum.config.feign.AppUserClient;
import com.jinkyumpark.forum.config.feign.response.AppUserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        AppUserInfo appUserInfo = appUserClient.getUserInfoByUserId(postDto.getAppUserId());
        BookInfo bookInfo = bookClient.getBookInfoByIsbn(postDto.getIsbn());

        PostLikeCount likeCount = postLikeService.getPostLikeCount(postId);
        int commentCount = commentService.getCommentCountByPostId(postId);

        return PostResponse.of(postDto, appUserInfo, bookInfo, likeCount, commentCount);
    }

    @GetMapping("by-isbn")
    public List<PostResponse> getPostByIsbn(@RequestParam("isbn") Long isbn,
                                            @RequestParam("page") Integer page,
                                            @RequestParam("size") Integer size
    ) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size);

        return postService.getPostByIsbn(isbn, pageable).stream()
                .map(post -> PostResponse.of(
                                post,
                                appUserClient.getUserInfoByUserId(post.getAppUserId()),
                                bookClient.getBookInfoByIsbn(post.getIsbn()),
                                postLikeService.getPostLikeCount(post.getPostId()),
                                commentService.getCommentCountByPostId(post.getPostId()
                                )
                        )
                )
                .collect(Collectors.toList());
    }

    @GetMapping
    public List<PostResponse> getPostByOrder(@RequestParam("sort") String sort,
                                             @RequestParam(value = "page", required = false) Integer page,
                                             @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDate").descending());

        List<PostDto> posts = postService.getAllPostOrderBy(PostSort.valueOf(sort.toUpperCase()), pageable);

        return posts.stream()
                .map(post ->
                        PostResponse.of(
                                post,
                                appUserClient.getUserInfoByUserId(post.getAppUserId()),
                                bookClient.getBookInfoByIsbn(post.getIsbn()),
                                postLikeService.getPostLikeCount(post.getPostId()),
                                commentService.getCommentCountByPostId(post.getPostId())
                        )
                )
                .collect(Collectors.toList());
    }

    @PostMapping
    public AddSuccessResponse addPost(@LoginUser User user,
                                      @RequestBody @Valid PostAddRequest postAddRequest) {
        Post post = postService.addPost(postAddRequest.toEntity(user.getId()));

        return AddSuccessResponse.builder()
                .id(post.getPostId())
                .message("게시글을 추가했어요")
                .build();
    }

    @PutMapping("{postId}")
    public UpdateSuccessResponse updatePost(@LoginUser User user,
                                            @PathVariable("postId") Long postId,
                                            @RequestBody @Valid PostEditRequest postEditRequest) {

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
