package com.jinkyumpark.bookitout.controller;

import com.jinkyumpark.bookitout.service.QnaService;
import com.jinkyumpark.bookitout.request.qna.QnaAddRequest;
import com.jinkyumpark.bookitout.request.qna.QnaEditRequest;
import com.jinkyumpark.bookitout.user.AppUserService;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.model.Qna;
import com.jinkyumpark.bookitout.response.common.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.common.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.common.EditSuccessResponse;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/qna")
public class QnaControllerV1 {
    private final MessageSourceAccessor messageSource;
    private final QnaService qnaService;

    @GetMapping("all")
    public Page<Qna> getAllQna(@RequestParam(value = "page", required = false) Integer page,
                               @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 0;
        if (size == null) size = 10;
        PageRequest pageRequest = PageRequest.of(page, size);

        return qnaService.getAllQnaPage(pageRequest);
    }

    @GetMapping("all/user")
    public List<Qna> getAllQnaByUserId(@LoginUser LoginAppUser loginAppUser) {
        return qnaService.getAllQnaByUserid(loginAppUser.getId());
    }

    @PostMapping
    public AddSuccessResponse addQna(@RequestBody @Valid QnaAddRequest qnaAddRequest) {
        if (qnaAddRequest.getAppUserId() == null && qnaAddRequest.getPassword() == null) {
            throw new BadRequestException(messageSource.getMessage("qna.add.fail.no-credential"));
        }

        qnaService.addQna(qnaAddRequest);

        return new AddSuccessResponse("POST v1/qna", messageSource.getMessage("qna.add.success"));
    }

    @PutMapping("{qnaId}")
    public EditSuccessResponse editQna(@PathVariable("qnaId") Long qnaId,
                                       @RequestBody @Valid QnaEditRequest qnaEditRequest,
                                       @LoginUser LoginAppUser loginAppUser) {
        qnaEditRequest.setQnaId(qnaId);

        qnaService.editQna(qnaEditRequest, loginAppUser);

        return new EditSuccessResponse(String.format("PUT v1/qna/%d", qnaId), messageSource.getMessage("qna.edit.success"));
    }

    @DeleteMapping("{qnaId}")
    public DeleteSuccessResponse deleteQna(@PathVariable("qnaId") Long qnaId, @RequestParam(value = "password", required = false) String password) {
        Qna qna = qnaService.getQnaById(qnaId);

        if (qna.getAppUser() != null) {
            Long loginAppUser = AppUserService.getLoginAppUserId();
            if (!qna.getAppUser().getAppUserId().equals(loginAppUser)) {
                throw new NotAuthorizeException(messageSource.getMessage("qna.delete.fail.not-authorize"));
            }
        }

        if (qna.getAppUser() == null && !qna.getPassword().equals(password)) {
            throw new NotAuthorizeException(messageSource.getMessage("qna.delete.fail.wrong-pw"));
        }

        qnaService.deleteQnaById(qnaId);

        return new DeleteSuccessResponse(String.format("DELETE v1/qna/%d", qnaId), messageSource.getMessage("qna.delete.success"));
    }
}
