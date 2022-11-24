package com.jinkyumpark.bookitout.quotation;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor

@RestController
@RequestMapping("/v1/quotation")
public class QuotationControllerV1 {
    QuotationService quotationService;
    BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Quotation> getAllQuotationByBookId(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(loginUserId) && !book.getIsSharing()) {
            throw new BookNotSharingException();
        }

        return quotationService.getAllQuotationByBookId(bookId);
    }
}
