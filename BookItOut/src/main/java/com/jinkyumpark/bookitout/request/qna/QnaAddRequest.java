package com.jinkyumpark.bookitout.request.qna;

import com.jinkyumpark.bookitout.model.Qna;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class QnaAddRequest {
    @NotNull
    @NotBlank
    private String question;

    private Long appUserId;
    private String password;

    public Qna toEntity() {
        return Qna.builder()
                .question(question)
                .appUser(new AppUser(appUserId))
                .password(password)
                .build();
    }
}
