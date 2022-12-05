package com.jinkyumpark.bookitout.app.qna;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class QnaService {
    private final QnaRepository qnaRepository;

    public Page<Qna> getAllQnaPage(PageRequest pageRequest) {
        return qnaRepository.findAll(pageRequest);
    }

    public List<Qna> getAllQnaByUserid(Long userId) {
        return qnaRepository.findAllByAppUser_AppUserId(userId);
    }

    public void addQna(Qna qna) {
        qnaRepository.save(qna);
    }

    public Qna getQnaById(Long qnaId) {
        return qnaRepository.findById(qnaId)
                .orElseThrow();
    }

    public void deleteQnaById(Long qnaId) {
        qnaRepository.deleteById(qnaId);
    }
}
