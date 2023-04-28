package com.jinkyumpark.core.book;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.core.book.dto.BookDto;
import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.book.request.BookAddRequest;
import com.jinkyumpark.core.book.request.BookEditRequest;
import com.jinkyumpark.core.common.response.AddSuccessResponse;
import com.jinkyumpark.core.common.response.DeleteSuccessResponse;
import com.jinkyumpark.core.common.response.EditSuccessResponse;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/book")
public class BookControllerV1 {
    private final MessageSourceAccessor messageSource;
    private final BookService bookService;

    @GetMapping("{id}")
    public Book getBookById(@PathVariable("id") Long bookId,
                            @LoginUser LoginAppUser loginAppUser) {
        return bookService.getBookById(loginAppUser, bookId);
    }

    @GetMapping("last")
    public Book getLastBook(@LoginUser LoginAppUser loginAppUser) {
        return bookService.getLastBookByAppUserid(loginAppUser.getId());
    }

    @GetMapping("all/{range}")
    public Page<Book> getAllBooks(@PathVariable(value = "range", required = false) String range,
                                  @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                  @RequestParam(value = "size", required = false, defaultValue = "10") Integer size,
                                  @LoginUser LoginAppUser loginAppUser) {
        Pageable pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());

        if (range.equals("not-started")) return bookService.getAllNotStartedBook(loginAppUser.getId(), pageRequest);
        if (range.equals("started")) return bookService.getAllStartedBook(loginAppUser.getId(), pageRequest);
        if (range.equals("not-done")) return bookService.getAllNotDoneBook(loginAppUser.getId(), pageRequest);
        if (range.equals("done")) return bookService.getAllDoneBook(loginAppUser.getId(), pageRequest);
        if (range.equals("give-up")) return bookService.getAllGiveUpBook(loginAppUser.getId(), pageRequest);

        return bookService.getAllBooks(loginAppUser.getId(), pageRequest);
    }

    @GetMapping("current-reading-session")
    public Book getCurrentReadingSessionBook(@LoginUser LoginAppUser loginAppUser) {
        return bookService.getCurrentReadingSessionBook(loginAppUser.getId());
    }

    @PostMapping
    public AddSuccessResponse addBook(@RequestBody @Valid BookAddRequest bookAddRequest,
                                      @LoginUser LoginAppUser loginAppUser) {
        BookDto bookDto = BookDto.builder()
                .title(bookAddRequest.getTitle())
                .author(bookAddRequest.getAuthor())
                .endPage(bookAddRequest.getEndPage())
                .source(bookAddRequest.getSource())
                .cover(bookAddRequest.getCover())
                .category(bookAddRequest.getCategory())
                .language(bookAddRequest.getLanguage())
                .isSharing(bookAddRequest.getIsSharing())
                .form(bookAddRequest.getForm())
                .appUserId(loginAppUser.getId())
                .build();

        Long bookId = bookService.addBook(bookDto);

        return AddSuccessResponse.builder()
                .id(bookId)
                .message(messageSource.getMessage("book.add.success"))
                .build();
    }

    @PutMapping("{id}")
    public UpdateSuccessResponse editBook(@PathVariable("id") Long bookId,
                                          @RequestBody @Valid BookEditRequest bookEditRequest,
                                          @LoginUser LoginAppUser loginAppUser) {
        BookDto bookDto = BookDto.builder()
                .title(bookEditRequest.getTitle())
                .author(bookEditRequest.getAuthor())
                .language(bookEditRequest.getLanguage())
                .category(bookEditRequest.getCategory())
                .endPage(bookEditRequest.getEndPage())
                .cover(bookEditRequest.getCover())
                .source(bookEditRequest.getSource())
                .isSharing(bookEditRequest.getIsSharing())
                .rating(bookEditRequest.getRating())
                .summary(bookEditRequest.getSummary())
                .review(bookEditRequest.getReview())
                .memoType(bookEditRequest.getBookMemoType())
                .memoLink(bookEditRequest.getBookMemoLink())
                .build();

        bookService.editBook(bookId, bookDto, loginAppUser.getId());

        return UpdateSuccessResponse.builder()
                .message(messageSource.getMessage("book.update.success"))
                .id(bookId)
                .build();
    }

    @PutMapping("give-up/{bookId}")
    public UpdateSuccessResponse giveUpBook(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        bookService.giveUpBook(bookId, loginAppUser);

        return UpdateSuccessResponse.builder()
                .id(bookId)
                .build();
    }

    @PutMapping("un-give-up/{bookId}")
    public UpdateSuccessResponse unGiveUpBook(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        bookService.unGiveUpBook(bookId, loginAppUser);

        return UpdateSuccessResponse.builder()
                .id(bookId)
                .build();
    }

    @DeleteMapping("{bookId}")
    public DeleteSuccessResponse deleteBook(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        bookService.deleteBookByBookId(bookId, loginAppUser);

        return DeleteSuccessResponse.builder()
                .message(messageSource.getMessage("book.delete.success"))
                .build();
    }
}