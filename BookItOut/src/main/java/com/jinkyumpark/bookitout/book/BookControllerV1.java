package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.request.BookAddRequest;
import com.jinkyumpark.bookitout.book.response.*;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.user.AppUserAuthenticationToken;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Book getBookById(@PathVariable("id") Long bookId) {
        Optional<Book> bookOptional = bookService.getBookById(bookId);

        if (bookOptional.isEmpty()) {
            throw new NotFoundException("해당 id의 책은 존재하지 않아요");
        }

        return bookOptional.get();
    }

    @GetMapping("last")
    public Book getLastBook() {
        Long appUserId = AppUserService.getLoginAppUserId();

        Optional<Book> userBookOptional = bookService.getLastBookByUserid(appUserId);

        if (userBookOptional.isEmpty()) {
            throw new NotFoundException("아직 책-it-out으로 책을 읽으신 적이 없어요. 지금 바로 독서활동을 기록해 보세요!");
        }

        return userBookOptional.get();
    }

    @GetMapping("notdone/all")
    public Page<Book> getAllNotDoneBook(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                        @RequestParam(value = "size", required = false, defaultValue = "9") Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Long loginUserId = AppUserService.getLoginAppUserId();

//        Page<Book> bookList = bookService.getAllNotDoneBook(loginUserId, pageRequest);
//        return bookList;

        return null;
    }


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