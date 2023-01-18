package com.jinkyumpark.bookitout.qna;

import com.jinkyumpark.bookitout.user.AppUser;
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
