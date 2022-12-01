package com.jinkyumpark.bookitout.app.qna;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class QnaService {
    private final QnaRepository qnaRepository;
}
