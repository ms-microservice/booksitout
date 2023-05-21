package com.jinkyumpark.community.talk.comment;

import com.jinkyumpark.community.config.jpa.TimeEntity;
import com.jinkyumpark.community.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;

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