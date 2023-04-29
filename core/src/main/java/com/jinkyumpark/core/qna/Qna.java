package com.jinkyumpark.core.qna;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.core.qna.request.QnaEditRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity(name = "Qna") @Table(name = "qna")
public class Qna {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id", updatable = false)
    @Id
    private Long qnaId;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @JsonIgnore
    private Long appUserId;

    public Qna(String question) {
        this.question = question;
    }

    public void editQna(QnaEditRequest qnaEditRequest) {
        if (qnaEditRequest.getPassword() != null) this.password = qnaEditRequest.getPassword();
        if (qnaEditRequest.getQuestion() != null) this.question = qnaEditRequest.getQuestion();
    }
}
