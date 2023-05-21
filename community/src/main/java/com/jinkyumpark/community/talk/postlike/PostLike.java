package com.jinkyumpark.community.talk.postlike;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.community.talk.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
@Table(uniqueConstraints = {@UniqueConstraint(name = "post_like_unique", columnNames = {"post_id", "appUserId"})})
@Entity
public class PostLike {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postLikeId;

    @Column(columnDefinition = "BIT(1)")
    private Integer score;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    private Long appUserId;

    public PostLike updateScore(int score) {
        this.score = score;
        return this;
    }

}