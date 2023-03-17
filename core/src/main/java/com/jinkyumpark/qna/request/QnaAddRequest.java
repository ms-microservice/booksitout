package com.jinkyumpark.qna.request;

import com.jinkyumpark.qna.Qna;
import com.jinkyumpark.user.AppUser;
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
