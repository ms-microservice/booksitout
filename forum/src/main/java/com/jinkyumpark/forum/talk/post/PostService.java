package com.jinkyumpark.forum.talk.post;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import com.jinkyumpark.forum.config.feign.BookClient;
import com.jinkyumpark.forum.talk.post.dto.PostSort;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final BookClient bookClient;

    public PostDto getPostByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("게시글이 없어요"));

        return PostDto.of(post);
    }

    public List<PostDto> getPostByIsbn(Long isbn, Pageable pageable) {
        return postRepository.findAllByIsbn(isbn, pageable).stream()
                .map(PostDto::of)
                .collect(Collectors.toList());
    }

    public List<PostDto> getAllPostOrderBy(PostSort postSort, Pageable pageable) {

        if (postSort == PostSort.POPULAR) return postRepository
                .findAllOrderByPopular(pageable).stream()
                .map(PostDto::of)
                .collect(Collectors.toList());

        return postRepository
                .findAll(pageable).stream()
                .map(PostDto::of)
                .collect(Collectors.toList());
    }

    public List<PostDto> getAllPostByAppUserId(Long appUserId, Pageable pageable) {
        return postRepository.findAllByAppUserId(appUserId, pageable).stream()
                .map(PostDto::of)
                .collect(Collectors.toList());
    }

    public Page<Post> getAllPostByAppUserIdPaged(Long appUserId, Pageable pageable) {
        return postRepository.findAllByAppUserIdPaged(appUserId, pageable);
    }

    @Transactional
    public Post addPost(Post post) {
        bookClient.addBookIsbnIfAbsent(post.getIsbn());

        return postRepository.save(post);
    }

    @Transactional
    public Post updatePost(Post updatedPost) {
        Post post = postRepository.findById(updatedPost.getPostId())
                .orElseThrow(() -> new NotFoundException("수정하려는 게시글이 없어요"));

        if (!Objects.equals(post.getAppUserId(), updatedPost.getAppUserId())) {
            throw new UnauthorizedException("게시글은 본인만 수정할 수 있어요");
        }

        post.updatePost(updatedPost);

        return post;
    }

    public void deletePost(Long postId, Long appUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("삭제하려는 게시글이 없어요"));

        if (!Objects.equals(post.getAppUserId(), appUserId)) throw new UnauthorizedException("게시글은 본인만 삭제할 수 있어요");

        postRepository.deleteById(postId);
    }

}
