package com.jinkyumpark.bookitout.controller;

import com.jinkyumpark.bookitout.service.QuotationService;
import com.jinkyumpark.bookitout.model.Quotation;
import com.jinkyumpark.bookitout.service.BookService;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.request.quotation.QuotationAddRequest;
import com.jinkyumpark.bookitout.request.quotation.QuotationEditRequest;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.response.common.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.common.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.common.EditSuccessResponse;
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

        Quotation quotation = new Quotation(quotationAddRequest.getPage(), quotationAddRequest.getContent(), quotationAddRequest.getFromWho(), book);
        quotationService.addQuotation(quotation);

        return new AddSuccessResponse(messageSource.getMessage("quotation.add.success"));
    }

    @PutMapping("{quotationId}")
    public EditSuccessResponse editQuotation(@PathVariable("quotationId") Long quotationId,
                                             @RequestBody @Valid QuotationEditRequest quotationEditRequest) {
        quotationService.editQuotation(quotationId, quotationEditRequest);

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
