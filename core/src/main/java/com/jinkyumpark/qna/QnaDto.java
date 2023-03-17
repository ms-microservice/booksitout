package com.jinkyumpark.qna;

import com.jinkyumpark.user.AppUser;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QnaDto {
    private final String question;
    private final String answer;
    private final String password;
    private final Long appUserId;

    public Qna toEntity() {
        return Qna.builder()
                .question(question)
                .answer(answer)
                .password(password)
                .appUser(new AppUser(appUserId))
                .build();
    }
}
