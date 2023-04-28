package com.jinkyumpark.core.qna;

import com.jinkyumpark.common.exception.UnauthorizedException;
import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.core.qna.request.QnaAddRequest;
import com.jinkyumpark.core.qna.request.QnaEditRequest;
import com.jinkyumpark.core.loginUser.LoginAppUser;
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

    public Qna getQnaById(Long qnaId) {
        return qnaRepository.findById(qnaId)
                .orElseThrow();
    }

    public Long addQna(QnaAddRequest qnaAddRequest) {
        return qnaRepository.save(qnaAddRequest.toEntity()).getQnaId();
    }

    @Transactional
    public void editQna(QnaEditRequest qnaEditRequest, LoginAppUser loginAppUser) {
        Qna qna = qnaRepository.findById(qnaEditRequest.getQnaId())
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("qna.edit.fail.not-found")));

        if (qna.getAppUserId() != null && !qna.getAppUserId().equals(loginAppUser.getId()))
            throw new UnauthorizedException("");
        if (!qna.getPassword().equals(qnaEditRequest.getPassword()))
            throw new UnauthorizedException("");

        qna.editQna(qnaEditRequest);
    }


    public void deleteQnaById(Long qnaId) {
        qnaRepository.deleteById(qnaId);
    }
}
