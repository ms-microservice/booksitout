package com.jinkyumpark.bookitout.controller;

import com.jinkyumpark.bookitout.service.QuotationService;
import com.jinkyumpark.bookitout.model.Quotation;
import com.jinkyumpark.bookitout.service.BookService;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.request.QuotationAddRequest;
import com.jinkyumpark.bookitout.request.QuotationEditRequest;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.response.common.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.common.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.common.EditSuccessResponse;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor

@RestController
@RequestMapping("/v1/quotation")
public class QuotationControllerV1 {
    QuotationService quotationService;
    BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Quotation> getAllQuotationByBookId(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId()) && !book.getIsSharing()) {
            throw new BookNotSharingException();
        }

        return quotationService.getAllQuotationByBookId(bookId);
    }

    @PostMapping("{bookId}")
    public AddSuccessResponse addQuotation(@PathVariable("bookId") Long bookId,
                                           @RequestBody @Valid QuotationAddRequest quotationAddRequest,
                                           @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException();
        }

        Quotation quotation = new Quotation(quotationAddRequest.getPage(), quotationAddRequest.getContent(), quotationAddRequest.getFromWho(), book);
        quotationService.addQuotation(quotation);

        return new AddSuccessResponse("인용을 추가했어요");
    }

    @PutMapping("{quotationId}")
    public EditSuccessResponse editQuotation(@PathVariable("quotationId") Long quotationId,
                                             @RequestBody @Valid QuotationEditRequest quotationEditRequest
    ) {
        quotationService.editQuotation(quotationId, quotationEditRequest);

        return new EditSuccessResponse(String.format("PUT v1/quotation/%d", quotationId), "인용을 수정했어요");
    }

    @DeleteMapping("{quotationId}")
    public DeleteSuccessResponse deleteQuotation(@PathVariable("quotationId") Long quotationId) {
        Quotation quotation = quotationService.getQuotationByQuotationId(quotationId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (! quotation.getBook().getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException("인용은 책 주인만 삭제할 수 있어요");
        }

        quotationService.deleteQuotation(quotationId);

        return new DeleteSuccessResponse(String.format("DELETE v1/quotation/%d", quotationId), "인용을 지웠어요");
    }
}
