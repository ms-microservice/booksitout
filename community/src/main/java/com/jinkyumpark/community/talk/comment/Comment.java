package com.jinkyumpark.community.talk.comment;

import com.jinkyumpark.community.config.jpa.TimeEntity;
import com.jinkyumpark.community.talk.commentlike.CommentLike;
import com.jinkyumpark.community.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class Comment extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @NotBlank
    @Column(length = 1000)
    private String content;

    @Column(nullable = false)
    private Long appUserId;

    @ManyToOne @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<CommentLike> commentLikeList;

    public Comment updateComment(String content) {
        if (content != null) {
            this.content = content;
        }

        return this;
    }

}