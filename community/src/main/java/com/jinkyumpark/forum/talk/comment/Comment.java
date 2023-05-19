package com.jinkyumpark.forum.talk.comment;

import com.jinkyumpark.forum.config.jpa.TimeEntity;
import com.jinkyumpark.forum.talk.commentlike.CommentLike;
import com.jinkyumpark.forum.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Table
@Entity
public class Comment extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @NotBlank
    @Column(length = 1000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    private Long appUserId;

    @Transactional
    public void updateComment(String content) {
        if (content != null) {
            this.content = content;
        }
    }

}