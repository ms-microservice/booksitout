package com.jinkyumpark.core.qna;

import com.jinkyumpark.common.exception.BadRequestException;
import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.core.qna.request.QnaAddRequest;
import com.jinkyumpark.core.qna.request.QnaEditRequest;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
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
                .build();
    }

    @PutMapping("{qnaId}")
    public UpdateSuccessResponse editQna(@PathVariable("qnaId") Long qnaId,
                                         @RequestBody @Valid QnaEditRequest qnaEditRequest,
                                         @LoginUser LoginAppUser loginAppUser) {
        qnaEditRequest.setQnaId(qnaId);

        qnaService.editQna(qnaEditRequest, loginAppUser);

        return UpdateSuccessResponse.builder()
                .message(messageSource.getMessage("qna.edit.success"))
                .id(qnaId)
                .build();
    }

//    @DeleteMapping("{qnaId}")
//    public DeleteSuccessResponse deleteQna(@PathVariable("qnaId") Long qnaId, @RequestParam(value = "password", required = false) String password) {
//        Qna qna = qnaService.getQnaById(qnaId);
//
//        if (qna.getAppUserId() != null) {
//            Long loginAppUser = AppUserService.getLoginAppUserId();
//            if (!qna.getAppUserId().getAppUserId().equals(loginAppUser)) {
//                throw new NotAuthorizeException(messageSource.getMessage("qna.delete.fail.not-authorize"));
//            }
//        }
//
//        if (qna.getAppUserId() == null && !qna.getPassword().equals(password)) {
//            throw new NotAuthorizeException(messageSource.getMessage("qna.delete.fail.wrong-pw"));
//        }
//
//        qnaService.deleteQnaById(qnaId);
//
//        return new DeleteSuccessResponse(String.format("DELETE v1/qna/%d", qnaId), messageSource.getMessage("qna.delete.success"));
//    }
}
