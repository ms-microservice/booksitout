package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.request.BookAddRequest;
import com.jinkyumpark.bookitout.book.response.*;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/book")
public class BookControllerV1 {
    private BookService bookService;
    private AppUserService appUserService;

    @GetMapping("{id}")
    public Book getBookById(@PathVariable("id") Long id) {
        Optional<Book> bookOptional = bookService.getBookById(id);

        if (bookOptional.isEmpty()) {
            throw new NotFoundException("해당 id의 책은 존재하지 않아요");
        }

        return bookOptional.get();
    }

    @GetMapping("last")
    public Book getLastBook() {
        String loginUserid = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<Book> userBookOptional = bookService.getLastBookByUserid(loginUserid);

        if (userBookOptional.isEmpty()) {
            throw new NotFoundException("No Reading Session Available");
        }

        return userBookOptional.get();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping
    public BookAddSuccessResponse addBook(@RequestBody @Valid BookAddRequest bookAddRequest) {
        Book book = new Book();
        book.setTitle(bookAddRequest.getTitle());

        Book result = bookService.addBook(book);

        if (result.equals(book)) {
            return new BookAddSuccessResponse("책을 추가했어요");
        }

        throw new BadRequestException("책을 추가할 수 없었어요. 잠시 뒤 다시 시도해 주세요");
    }
}