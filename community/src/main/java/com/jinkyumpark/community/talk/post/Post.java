package com.jinkyumpark.community.talk.post;

import com.jinkyumpark.community.config.jpa.TimeEntity;
import com.jinkyumpark.community.talk.comment.Comment;
import com.jinkyumpark.community.talk.postlike.PostLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Table
@Entity
public class Post extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @NotBlank
    private String title;

    @NotBlank
    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;

    @Column(length = 15)
    private Long isbn;

    private Long appUserId;

    @OneToMany(mappedBy = "post")
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<PostLike> postLikeList = new ArrayList<>();

    public void updatePost(Post updatedPost) {
        if (updatedPost.getTitle() != null) this.title = updatedPost.getTitle();
        if (updatedPost.getContent() != null) this.content = updatedPost.getContent();
        if (updatedPost.getIsbn() != null) this.isbn = updatedPost.getIsbn();
    }

}