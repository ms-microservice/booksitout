package com.jinkyumpark.bookitout.app.book;

import com.jinkyumpark.bookitout.app.book.model.BookCategory;
import com.jinkyumpark.bookitout.app.book.model.BookLanguage;
import com.jinkyumpark.bookitout.app.book.model.BookSource;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.book.request.BookAddRequest;
import com.jinkyumpark.bookitout.app.book.request.BookEditRequest;
import com.jinkyumpark.bookitout.app.book.model.BookForm;
import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/book")
public class BookControllerV1 {
    private BookService bookService;

    private final String BOOK_ADD_SUCCESS_MESSAGE = "책을 추가했어요";
    private final String BOOK_ADD_FAIL_MESSAGE = "책을 추가할 수 없었어요. 잠시 뒤 다시 시도해 주세요";
    private final String BOOK_EDIT_SUCCESS_MESSSAGE = "등록하신 책을 수정했어요";
    private final String BOOK_DELETE_SUCCESS_MESSAGE = "해당 책을 지웠어요";
    private final String BOOK_NOT_SHARING_MESSAGE = "해당 책의 등록자가 책을 공유하길 원치 않아요";

    @GetMapping("{id}")
    public Book getBookById(@PathVariable("id") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getIsSharing() && !book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException(BOOK_NOT_SHARING_MESSAGE);
        }

        return book;
    }

    @GetMapping("last")
    public Book getLastBook() {
        Long appUserId = AppUserService.getLoginAppUserId();
        return bookService.getLastBookByAppUserid(appUserId);
    }

    @GetMapping("all/{range}")
    public List<Book> getAllBooks(@PathVariable(value = "range", required = false) String range,
                                  @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                  @RequestParam(value = "size", required = false, defaultValue = "10") Integer size
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Pageable pageRequest = PageRequest.of(page, size, Sort.by("addDate").descending());

        if (range.equals("done")) return bookService.getAllDoneBook(loginUserId, pageRequest);
        if (range.equals("not-done")) return bookService.getAllNotDoneBook(loginUserId, pageRequest);
        if (range.equals("give-up")) return bookService.getAllGiveupBook(loginUserId, pageRequest);
        return bookService.getAllBook(loginUserId, pageRequest);
    }

    @PostMapping
    public AddSuccessResponse addBook(@RequestBody @Valid BookAddRequest bookAddRequest) {
        // TODO : Builder
        Book book = new Book();
        book.setTitle(bookAddRequest.getTitle());
        book.setAuthor(bookAddRequest.getAuthor());
        book.setEndPage(bookAddRequest.getEndPage());
        book.setSource(BookSource.valueOf(bookAddRequest.getSource()));
        book.setCover(bookAddRequest.getCover());
        book.setCategory(BookCategory.valueOf(bookAddRequest.getCategory()));
        book.setLanguage(BookLanguage.valueOf(bookAddRequest.getLanguage()));
        book.setIsSharing(bookAddRequest.getIsSharing());
        book.setForm(BookForm.valueOf(bookAddRequest.getForm()));

        Long loginUserId = AppUserService.getLoginAppUserId();
        AppUser appUser = new AppUser(loginUserId);
        book.setAppUser(appUser);

        bookService.addBook(book);

        return new AddSuccessResponse(BOOK_ADD_SUCCESS_MESSAGE);
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

        editedBook.setLanguage(BookLanguage.valueOf(bookEditRequest.getLanguage()));

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

        bookService.editBook(editedBook);

        return new EditSuccessResponse(String.format("PUT /v1/book/%d", bookId), BOOK_EDIT_SUCCESS_MESSSAGE);
    }

    @PutMapping("give-up/{bookId}")
    @Transactional
    public EditSuccessResponse giveUpBook(@PathVariable("bookId") Long bookId) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Book book = bookService.getBookById(bookId);

        if (! book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException();
        }

        book.setIsGiveUp(true);

        return new EditSuccessResponse(String.format("v1/book/give-up/%d", bookId));
    }

    @DeleteMapping("{id}")
    public DeleteSuccessResponse deleteBook(@PathVariable("id") Long id) {
        bookService.deleteBookByBookId(id);

        return new DeleteSuccessResponse("DELETE /v1/book/" + id, BOOK_DELETE_SUCCESS_MESSAGE);
    }
}