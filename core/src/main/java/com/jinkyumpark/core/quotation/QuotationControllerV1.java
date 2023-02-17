package com.jinkyumpark.core.quotation;

import com.jinkyumpark.core.book.BookService;
import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.quotation.request.QuotationAddRequest;
import com.jinkyumpark.core.quotation.request.QuotationEditRequest;
import com.jinkyumpark.core.user.login.LoginAppUser;
import com.jinkyumpark.core.user.login.LoginUser;
import com.jinkyumpark.core.common.exception.http.NotAuthorizeException;
import com.jinkyumpark.core.book.exception.BookNotSharingException;
import com.jinkyumpark.core.common.response.AddSuccessResponse;
import com.jinkyumpark.core.common.response.DeleteSuccessResponse;
import com.jinkyumpark.core.common.response.EditSuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/quotation")
public class QuotationControllerV1 {
    private final MessageSourceAccessor messageSource;
    private final QuotationService quotationService;
    private final BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Quotation> getAllQuotationByBookId(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId()) && !book.getIsSharing()) {
            throw new BookNotSharingException(messageSource.getMessage("quotation.get.fail.not-sharing"));
        }

        return quotationService.getAllQuotationByBookId(bookId);
    }

    @PostMapping("{bookId}")
    public AddSuccessResponse addQuotation(@PathVariable("bookId") Long bookId,
                                           @RequestBody @Valid QuotationAddRequest quotationAddRequest,
                                           @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException();
        }

        QuotationDto quotationDto = QuotationDto.builder()
                .page(quotationAddRequest.getPage())
                .content(quotationAddRequest.getContent())
                .fromWho(quotationAddRequest.getFromWho())
                .bookId(bookId)
                .build();

        Long quotationId = quotationService.addQuotation(quotationDto);

        return AddSuccessResponse.builder()
                .id(quotationId)
                .message(messageSource.getMessage("quotation.add.success"))
                .build();
    }

    @PutMapping("{quotationId}")
    public EditSuccessResponse editQuotation(@PathVariable("quotationId") Long quotationId,
                                             @RequestBody @Valid QuotationEditRequest quotationEditRequest) {
        QuotationDto quotationDto = QuotationDto.builder()
                .page(quotationEditRequest.getPage())
                .content(quotationEditRequest.getContent())
                .fromWho(quotationEditRequest.getFromWho())
                .build();

        quotationService.editQuotation(quotationId, quotationDto);

        return new EditSuccessResponse(String.format("PUT v1/quotation/%d", quotationId), messageSource.getMessage("quotation.edit.success"));
    }

    @DeleteMapping("{quotationId}")
    public DeleteSuccessResponse deleteQuotation(@PathVariable("quotationId") Long quotationId,
                                                 @LoginUser LoginAppUser loginAppUser) {
        Quotation quotation = quotationService.getQuotationByQuotationId(quotationId);

        if (!quotation.getBook().getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException(messageSource.getMessage("quotation.delete.fail.not-authorize"));
        }

        quotationService.deleteQuotation(quotationId);

        return new DeleteSuccessResponse(String.format("DELETE v1/quotation/%d", quotationId), messageSource.getMessage("quotation.delete.success"));
    }
}
