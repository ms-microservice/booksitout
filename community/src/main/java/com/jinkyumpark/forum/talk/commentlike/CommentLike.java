package com.jinkyumpark.forum.talk.commentlike;

import com.jinkyumpark.forum.config.jpa.TimeEntity;
import com.jinkyumpark.forum.talk.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Table(uniqueConstraints = {@UniqueConstraint(name = "comment_like_unique", columnNames = {"comment_id", "appUserId"})})
@Entity
public class CommentLike extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @Column(length = 1, nullable = false)
    @ColumnDefault("1")
    private Integer score;

    @ManyToOne @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;

    @Column(nullable = false)
    private Long appUserId;

    public CommentLike updateScore(int score) {
        this.score = score;

        return this;
    }

}