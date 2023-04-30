package com.jinkyumpark.forum.talk.post;

import com.jinkyumpark.forum.talk.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
@Table
@Entity
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @NotBlank
    private String title;

    @NotBlank
    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @Column(length = 20)
    private Integer isbn;

    private Long appUserId;

    @OneToMany(mappedBy = "post")
    private List<Comment> commentList = new ArrayList<>();

    public void updatePost(Post updatedPost) {
        if (updatedPost.getTitle() != null) title = updatedPost.getTitle();
        if (updatedPost.getContent() != null) content = updatedPost.getContent();
    }

}