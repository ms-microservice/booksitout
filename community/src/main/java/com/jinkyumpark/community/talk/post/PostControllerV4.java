package com.jinkyumpark.community.talk.post;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.community.config.feign.BookClient;
import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.config.feign.response.BookInfo;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import com.jinkyumpark.community.talk.comment.CommentService;
import com.jinkyumpark.community.talk.post.dto.PostAddRequest;
import com.jinkyumpark.community.talk.post.dto.PostEditRequest;
import com.jinkyumpark.community.talk.post.dto.PostSort;
import com.jinkyumpark.community.talk.post.dto.PostResponse;
import com.jinkyumpark.community.talk.postlike.PostLikeCount;
import com.jinkyumpark.community.talk.postlike.PostLikeService;
import com.jinkyumpark.community.config.feign.UserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    private final UserClient userClient;
    private final BookClient bookClient;

    @GetMapping("{postId}")
    public PostResponse getPostByPostId(@PathVariable("postId") Long postId,
                                        @RequestParam(value = "user-id", required = false) Long appUserId) {
        PostDto postDto = postService.getPostByPostId(postId);
        AppUserInfo publicUserInfo = userClient.getPublicUserByAppUserId(postDto.getAppUserId());
        BookInfo bookInfo = bookClient.getBookInfoByIsbn(postDto.getIsbn());

        PostLikeCount likeCount = postLikeService.getPostLikeCount(postId);
        int commentCount = commentService.getCommentCountByPostId(postId);
        int userLikeScore = appUserId == null || appUserId == 0 ? 0 : postLikeService.getUserPostLike(appUserId, postDto.getPostId());

        return PostResponse.of(postDto, publicUserInfo, bookInfo, likeCount, commentCount, userLikeScore);
    }

    @GetMapping("by-isbn")
    public List<PostResponse> getPostByIsbn(@RequestParam("isbn") Long isbn,
                                            @RequestParam(value = "user-id", required = false) Long appUserId,
                                            @RequestParam(value = "page", required = false) Integer page,
                                            @RequestParam(value = "size", required = false) Integer size
    ) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size);

        return postService.getPostByIsbn(isbn, pageable).stream()
                .map(post -> PostResponse.of(
                                post,
                                userClient.getPublicUserByAppUserId(post.getAppUserId()),
                                bookClient.getBookInfoByIsbn(post.getIsbn()),
                                postLikeService.getPostLikeCount(post.getPostId()),
                                commentService.getCommentCountByPostId(post.getPostId()),
                                appUserId == null || appUserId == 0 ? 0 : postLikeService.getUserPostLike(appUserId, post.getPostId())

                        )
                )
                .collect(Collectors.toList());
    }

    @GetMapping("by-name")
    public List<PostResponse> getAllPostByNickname(@RequestParam("name") String nickName,
                                                   @RequestParam(value = "user-id", required = false) Long appUserId,
                                                   @RequestParam(value = "page", required = false) Integer page,
                                                   @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDate").descending());

        AppUserInfo publicUser = userClient.getUserByNickname(nickName);

        return postService.getAllPostByAppUserId(publicUser.getAppUserId(), pageable).stream()
                .map(post -> PostResponse.of(
                                post,
                                publicUser,
                                bookClient.getBookInfoByIsbn(post.getIsbn()),
                                postLikeService.getPostLikeCount(post.getPostId()),
                                commentService.getCommentCountByPostId(post.getPostId()),
                                appUserId == null || appUserId == 0 ? 0 : postLikeService.getUserPostLike(appUserId, post.getPostId())
                        )
                )
                .collect(Collectors.toList());
    }

    @GetMapping("by-name/paged")
    public PagedResponse getAllPostByNicknamePaged(@RequestParam("name") String nickName,
                                                   @RequestParam(value = "user-id", required = false) Long appUserId,
                                                   @RequestParam(value = "page", required = false) Integer page,
                                                   @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDate").descending());

        AppUserInfo publicUser = userClient.getUserByNickname(nickName);
        Page<Post> postPaged = postService.getAllPostByAppUserIdPaged(publicUser.getAppUserId(), pageable);
        AppUserInfo publicUserInfo = AppUserInfo.builder()
                .appUserId(publicUser.getAppUserId())
                .name(publicUser.getName())
                .profileImage(publicUser.getProfileImage())
                .build();

        List<PostResponse> content = postPaged.getContent()
                .stream()
                .map(post -> PostResponse.of(
                                PostDto.of(post),
                                publicUserInfo,
                                bookClient.getBookInfoByIsbn(post.getIsbn()),
                                postLikeService.getPostLikeCount(post.getPostId()),
                                commentService.getCommentCountByPostId(post.getPostId()),
                                appUserId == null || appUserId == 0 ? 0 : postLikeService.getUserPostLike(appUserId, post.getPostId())
                        )
                )
                .collect(Collectors.toList());

        return PagedResponse.builder()
                .first(postPaged.isFirst())
                .last(postPaged.isLast())
                .totalElements(postPaged.getNumberOfElements())
                .totalPages(postPaged.getTotalPages())
                .content(content)
                .build();
    }


    @GetMapping
    public PagedResponse getAllPostBySort(@RequestParam("sort") String sort,
                                               @RequestParam(value = "user-id", required = false) Long appUserId,
                                               @RequestParam(value = "page", required = false) Integer page,
                                               @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Post> pagedPost = postService.getAllPostOrderBy(PostSort.valueOf(sort.toUpperCase()), pageable);


        List<PostResponse> content = pagedPost.getContent().stream()
                .map(post ->
                        PostResponse.of(
                                PostDto.of(post),
                                userClient.getPublicUserByAppUserId(post.getAppUserId()),
                                bookClient.getBookInfoByIsbn(post.getIsbn()),
                                postLikeService.getPostLikeCount(post.getPostId()),
                                commentService.getCommentCountByPostId(post.getPostId()),
                                appUserId == null || appUserId == 0 ? 0 : postLikeService.getUserPostLike(appUserId, post.getPostId())
                        )
                )
                .collect(Collectors.toList());

        return PagedResponse.builder()
                .first(pagedPost.isFirst())
                .last(pagedPost.isLast())
                .totalPages(pagedPost.getTotalPages())
                .totalElements((int) pagedPost.getTotalElements())
                .content(content)
                .build();
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
