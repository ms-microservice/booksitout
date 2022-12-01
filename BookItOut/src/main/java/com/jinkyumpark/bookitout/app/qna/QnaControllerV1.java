package com.jinkyumpark.bookitout.app.qna;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/qna")
public class QnaControllerV1 {
    private final QnaService qnaService;
}
