package com.jinkyumpark.community.talk.commentlike;

import com.jinkyumpark.community.config.jpa.TimeEntity;
import com.jinkyumpark.community.talk.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity
@Table(name = "comment_like",
        uniqueConstraints = {
                @UniqueConstraint(name = "comment_like_unique", columnNames = {"comment_id", "app_user_id"})
        }
)
public class CommentLike extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @Column(length = 1, nullable = false)
    @ColumnDefault("1")
    private Integer score;

    @ManyToOne @JoinColumn(name = "comment_id")
    private Comment comment;

    @Column(name = "app_user_id", nullable = false)
    private Long appUserId;

    public CommentLike updateScore(int score) {
        this.score = score;
        return this;
    }

}