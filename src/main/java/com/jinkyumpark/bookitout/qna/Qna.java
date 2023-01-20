package com.jinkyumpark.bookitout.qna;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.qna.request.QnaEditRequest;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity(name = "Qna") @Table(name = "qna")
public class Qna {
    @SequenceGenerator(name = "qna_seq", sequenceName = "qna_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qna_seq")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", foreignKey = @ForeignKey(name = "qna_app_user_fk"))
    @JsonIgnore
    private AppUser appUser;

    public Qna(String question) {
        this.question = question;
    }

    public void editQna(QnaEditRequest qnaEditRequest) {
        if (qnaEditRequest.getPassword() != null) this.password = qnaEditRequest.getPassword();
        if (qnaEditRequest.getQuestion() != null) this.question = qnaEditRequest.getQuestion();
    }
}
