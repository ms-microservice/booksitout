package com.jinkyumpark.bookitout.qna;

import com.jinkyumpark.bookitout.qna.request.QnaAddRequest;
import com.jinkyumpark.bookitout.qna.request.QnaEditRequest;
import com.jinkyumpark.bookitout.user.AppUserService;
import com.jinkyumpark.bookitout.common.exception.http.BadRequestException;
import com.jinkyumpark.bookitout.common.exception.http.NotAuthorizeException;
import com.jinkyumpark.bookitout.common.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.common.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.common.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.user.login.LoginUser;
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

        Long qnaId = qnaService.addQna(qnaAddRequest);

        return AddSuccessResponse.builder()
                .id(qnaId)
                .message(messageSource.getMessage("qna.add.success"))
                .path("POST v1/qna")
                .build();
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
