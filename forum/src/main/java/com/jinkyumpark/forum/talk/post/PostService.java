package com.jinkyumpark.forum.talk.post;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    public PostDto getPostByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("게시글이 없어요"));

        return PostDto.of(post);
    }

    public List<PostDto> getPostByIsbn(Integer isbn, Pageable pageable) {
        return postRepository.findAllByIsbn(isbn, pageable).stream()
                .map(PostDto::of)
                .collect(Collectors.toList());
    }

    public Long addPost(Post post) {
        return postRepository.save(post).getPostId();
    }

    public Post updatePost(Post updatedPost) {
        Post post = postRepository.findById(updatedPost.getPostId())
                .orElseThrow(() -> new NotFoundException("수정하려는 게시글이 없어요"));

        if (post.getAppUserId() != updatedPost.getAppUserId()) throw new UnauthorizedException("게시글은 본인만 수정할 수 있어요");

        post.updatePost(updatedPost);

        return post;
    }

    public void deletePost(Long postId, Long appUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("삭제하려는 게시글이 없어요"));

        if (post.getAppUserId() != appUserId) throw new UnauthorizedException("게시글은 본인만 삭제할 수 있어요");

        postRepository.deleteById(postId);
    }

}
