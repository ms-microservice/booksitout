package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.request.BookAddRequest;
import com.jinkyumpark.bookitout.book.request.BookEditRequest;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.response.AddSucessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/book")
public class BookControllerV1 {
    private BookService bookService;

    private final String BOOK_SESSION_NOT_FOUND_MESSAGE = "아직 책-it-out으로 책을 읽으신 적이 없어요. 지금 바로 독서활동을 기록해 보세요!";
    private final String BOOK_ADD_SUCCESS_MESSAGE = "책을 추가했어요";
    private final String BOOK_ADD_FAIL_MESSAGE = "책을 추가할 수 없었어요. 잠시 뒤 다시 시도해 주세요";
    private final String BOOK_DELETE_SUCCESS_MESSAGE = "해당 책을 지웠어요";
    private final String BOOK_NOT_SHARING_MESSAGE = "해당 책의 등록자가 책을 공유하길 원치 않아요";

    @GetMapping("{id}")
    public Book getBookById(@PathVariable("id") Long bookId) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Book book = bookService.getBookById(bookId);

        if (book.getIsSharing() || book.getAppUser().getAppUserId().equals(loginUserId)) {
            return book;
        }

        throw new NotAuthorizeException(BOOK_NOT_SHARING_MESSAGE);
    }

    @GetMapping("last")
    public Book getLastBook() {
        Long appUserId = AppUserService.getLoginAppUserId();
        Optional<Book> bookOptional = bookService.getLastBookByUserid(appUserId);

        if (bookOptional.isEmpty()) {
            throw new NotFoundException(BOOK_SESSION_NOT_FOUND_MESSAGE);
        }

        return bookOptional.get();
    }

    @GetMapping("all")
    public List<Book> getAllBooks() {
        Long loginUserId = AppUserService.getLoginAppUserId();

        return bookService.getAllBook(loginUserId);
    }

    @GetMapping("all/done")
    public List<Book> getAllDoneBooks() {
        Long loginUserId = AppUserService.getLoginAppUserId();

        return bookService.getAllDoneBook(loginUserId);
    }

    @GetMapping("all/notdone")
    public List<Book> getAllNotDoneBook(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                        @RequestParam(value = "size", required = false, defaultValue = "9") Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Long loginUserId = AppUserService.getLoginAppUserId();

        return bookService.getAllNotDoneBook(loginUserId);
    }

    @PostMapping
    public AddSucessResponse addBook(@RequestBody @Valid BookAddRequest bookAddRequest) {
        Book book = new Book();
        book.setTitle(bookAddRequest.getTitle());
        book.setCurrentPage(bookAddRequest.getCurrentPage());
        book.setEndPage(bookAddRequest.getEndPage());
        book.setSource(BookSource.valueOf(bookAddRequest.getSource()));
        Long loginUserId = AppUserService.getLoginAppUserId();

        bookService.addBook(book, loginUserId);

        return new AddSucessResponse(BOOK_ADD_SUCCESS_MESSAGE);
    }

    @PutMapping("{id}")
    public EditSuccessResponse editBook(@PathVariable("id") Long bookId, @RequestBody @Valid BookEditRequest bookEditRequest) {
        Long loginUserId = AppUserService.getLoginAppUserId();

        Book editedBook = new Book();
        editedBook.setBookId(bookId);

        if (bookEditRequest.getTitle() != null) {
            editedBook.setTitle(bookEditRequest.getTitle());
        }
        if (bookEditRequest.getCover() != null) {
            editedBook.setCover(bookEditRequest.getCover());
        }
        if (bookEditRequest.getSummary() != null) {
            editedBook.setSummary(bookEditRequest.getSummary());
        }
        if (bookEditRequest.getSource() != null) {
            BookSource bookSource = BookSource.valueOf(bookEditRequest.getSource());
            editedBook.setSource(bookSource);
        }
        if (bookEditRequest.getReview() != null) {
            editedBook.setReview(bookEditRequest.getReview());
        }
        if (bookEditRequest.getIsSharing() != null) {
            editedBook.setIsSharing(bookEditRequest.getIsSharing());
        }
        if (bookEditRequest.getCurrentPage() != null) {
            editedBook.setCurrentPage(bookEditRequest.getCurrentPage());
        }

        bookService.editBook(editedBook);

        return new EditSuccessResponse("PUT /v1/book/" + bookId, "등록하신 책을 수정했어요");
    }

    @DeleteMapping("{id}")
    public DeleteSuccessResponse deleteBook(@PathVariable("id") Long id) {
        bookService.deleteBookById(id);

        return new DeleteSuccessResponse("DELETE /v1/book/" + id, BOOK_DELETE_SUCCESS_MESSAGE);
    }
}