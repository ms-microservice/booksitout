package com.jinkyumpark.bookitout.qna.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class QnaEditRequest {
    private Long qnaId;
    private String question;
    private String password;
}
