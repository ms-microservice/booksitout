package com.jinkyumpark.bookitout.controller;

import com.jinkyumpark.bookitout.service.BookService;
import com.jinkyumpark.bookitout.model.book.BookCategory;
import com.jinkyumpark.bookitout.model.book.BookLanguage;
import com.jinkyumpark.bookitout.model.book.BookSource;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.request.BookAddRequest;
import com.jinkyumpark.bookitout.request.BookEditRequest;
import com.jinkyumpark.bookitout.model.book.BookForm;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import com.jinkyumpark.bookitout.response.common.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.common.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.common.EditSuccessResponse;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@AllArgsConstructor
@RestController @RequestMapping("/v1/book")
public class BookControllerV1 {
    private final MessageSourceAccessor messageSource;
    private BookService bookService;

    @GetMapping("{id}")
    public Book getBookById(
            @PathVariable("id") Long bookId,
            @LoginUser LoginAppUser loginAppUSer
    ) {
        return bookService.getBookById(loginAppUSer, bookId);
    }

    @GetMapping("last")
    public Book getLastBook() {
        Long appUserId = AppUserService.getLoginAppUserId();
        return bookService.getLastBookByAppUserid(appUserId);
    }

    @GetMapping("all/{range}")
    public Page<Book> getAllBooks(@PathVariable(value = "range", required = false) String range,
                                  @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                  @RequestParam(value = "size", required = false, defaultValue = "10") Integer size
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Pageable pageRequest = PageRequest.of(page, size, Sort.by("addDate").descending());

        if (range.equals("not-started")) return bookService.getAllNotStartedBook(loginUserId, pageRequest);
        if (range.equals("started")) return bookService.getAllStartedBook(loginUserId, pageRequest);
        if (range.equals("not-done")) return bookService.getAllNotDoneBook(loginUserId, pageRequest);
        if (range.equals("done")) return bookService.getAllDoneBook(loginUserId, pageRequest);
        if (range.equals("give-up")) return bookService.getAllGiveUpBook(loginUserId, pageRequest);

        return bookService.getAllBooks(loginUserId, pageRequest);
    }

    @GetMapping("current-reading-session")
    public Book getCurrentReadingSessionBook(@LoginUser LoginAppUser loginAppUser) {
        return bookService.getCurrentReadingSessionBook(loginAppUser.getId());
    }

    @PostMapping
    public AddSuccessResponse addBook(@RequestBody @Valid BookAddRequest bookAddRequest, @LoginUser LoginAppUser loginAppUser) {
        Book book = Book.builder()
                .title(bookAddRequest.getTitle())
                .author(bookAddRequest.getAuthor())
                .endPage(bookAddRequest.getEndPage())
                .source(BookSource.valueOf(bookAddRequest.getSource()))
                .cover(bookAddRequest.getCover())
                .category(BookCategory.valueOf(bookAddRequest.getCategory()))
                .language(BookLanguage.valueOf(bookAddRequest.getLanguage()))
                .isSharing(bookAddRequest.getIsSharing())
                .form(BookForm.valueOf(bookAddRequest.getForm()))
                .appUser(new AppUser(loginAppUser.getId()))
                .build();

        bookService.addBook(book);

        return new AddSuccessResponse(messageSource.getMessage("book.add.success"));
    }

    @PutMapping("{id}")
    public EditSuccessResponse editBook(@PathVariable("id") Long bookId, @RequestBody @Valid BookEditRequest bookEditRequest) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Book editedBook = Book.builder()
                .bookId(bookId)
                .title(bookEditRequest.getTitle())
                .cover(bookEditRequest.getCover())
                .summary(bookEditRequest.getSummary())
                .language(bookEditRequest.getLanguage() != null ? BookLanguage.valueOf(bookEditRequest.getLanguage()) : null)
                .source(bookEditRequest.getSource() != null ? BookSource.valueOf(bookEditRequest.getSource()) : null)
                .review(bookEditRequest.getReview())
                .isSharing(bookEditRequest.getIsSharing())
                .rating(bookEditRequest.getRating())
                .endPage(bookEditRequest.getEndPage())
                .build();

        bookService.editBook(loginUserId, editedBook);

        return new EditSuccessResponse(String.format("PUT /v1/book/%d", bookId), messageSource.getMessage("book.update.success"));
    }

    @PutMapping("give-up/{bookId}")
    public EditSuccessResponse giveUpBook(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        bookService.giveUpUnGiveUpBook(bookId, true, loginAppUser);

        return new EditSuccessResponse(String.format("v1/book/give-up/%d", bookId));
    }

    @PutMapping("un-give-up/{bookId}")
    public EditSuccessResponse unGiveUpBook(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        bookService.giveUpUnGiveUpBook(bookId, false, loginAppUser);

        return new EditSuccessResponse(String.format("v1/book/un-give-up/%d", bookId));
    }

    @DeleteMapping("{bookId}")
    public DeleteSuccessResponse deleteBook(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        bookService.deleteBookByBookId(bookId, loginAppUser);

        return new DeleteSuccessResponse(String.format("DELETE /v1/book/%d", bookId), messageSource.getMessage("book.delete.success"));
    }
}