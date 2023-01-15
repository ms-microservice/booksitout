package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.model.Qna;
import com.jinkyumpark.bookitout.repository.QnaRepository;
import com.jinkyumpark.bookitout.request.qna.QnaAddRequest;
import com.jinkyumpark.bookitout.request.qna.QnaEditRequest;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QnaService {
    private final MessageSourceAccessor messageSource;
    private final QnaRepository qnaRepository;

    public Page<Qna> getAllQnaPage(PageRequest pageRequest) {
        return qnaRepository.findAll(pageRequest);
    }

    public List<Qna> getAllQnaByUserid(Long userId) {
        return qnaRepository.findAllByAppUser_AppUserId(userId);
    }

    public void addQna(QnaAddRequest qnaAddRequest) {
        qnaRepository.save(qnaAddRequest.toEntity());
    }

    public Qna getQnaById(Long qnaId) {
        return qnaRepository.findById(qnaId)
                .orElseThrow();
    }

    @Transactional
    public void editQna(QnaEditRequest qnaEditRequest, LoginAppUser loginAppUser) {
        Qna qna = qnaRepository.findById(qnaEditRequest.getQnaId())
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("qna.edit.fail.not-found")));

        if (qna.getAppUser() != null && !qna.getAppUser().getAppUserId().equals(loginAppUser.getId()))
            throw new NotAuthorizeException();
        if (!qna.getPassword().equals(qnaEditRequest.getPassword()))
            throw new NotAuthorizeException();

        qna.editQna(qnaEditRequest);
    }


    public void deleteQnaById(Long qnaId) {
        qnaRepository.deleteById(qnaId);
    }
}
