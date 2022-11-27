package com.jinkyumpark.bookitout.app.readingsession;

import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.book.BookService;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.exception.custom.ReadingSessionIsInProgressException;
import com.jinkyumpark.bookitout.response.AddSucessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.UpdateSuccessResponse;
import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/reading-session")
public class ReadingSessionControllerV1 {
    private final ReadingSessionService readingSessionService;
    private final BookService bookService;

    private final String BOOK_NOT_FOUND_MESSAGE = "해당 id의 책이 없어요";

    @GetMapping
    public ReadingSession getReadingSession(@RequestParam("reading-session-id") Long readingSessionId) {
        Optional<ReadingSession> readingSessionOptional = readingSessionService.getReadingSessionByReadingSessionId(readingSessionId);
        if (readingSessionOptional.isEmpty()) {
            throw new NotFoundException("찾으시는 독서활동이 없어요");
        }

        return readingSessionOptional.get();
    }

    @GetMapping("{bookId}")
    public List<ReadingSession> getReadingSessionByBookId(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);

        Long loginUserId = AppUserService.getLoginAppUserId();
        Long bookAppUserId = book.getAppUser().getAppUserId();

        if (!loginUserId.equals(bookAppUserId) && !book.getIsSharing()) {
            throw new BookNotSharingException();
        }

        List<ReadingSession> readingSessionList = readingSessionService.getReadingSessionByBookId(bookId);
        return readingSessionList;
    }

    @GetMapping("{userid}/all")
    public List<ReadingSession> getAllRecentReadingSessionByUserId(@PathVariable("userid") Long requestAppUserId,
                                                                   @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") Integer size
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        if (!loginUserId.equals(requestAppUserId)) {
            throw new NotAuthorizeException("해당 유저의 독서활동을 조회할 권한이 없어요");
        }

        Pageable pageRequest = PageRequest.of(page, size);
        List<ReadingSession> recentReadingSessionList = readingSessionService.getRecentReadingSessions(requestAppUserId, pageRequest);

        return recentReadingSessionList;
    }

    @GetMapping("current")
    public ReadingSession getCurrentReadingSession() {
        Long loginUserId = AppUserService.getLoginAppUserId();
        return readingSessionService.getCurrentReadingSession(loginUserId);
    }

    @PostMapping("{bookId}")
    public Book startReadingSession(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginAppUserId = AppUserService.getLoginAppUserId();

        if (!loginAppUserId.equals(book.getAppUser().getAppUserId())) {
            throw new BookNotSharingException("독서활동을 추가하시려는 책의 주인이 아니에요");
        }

        Optional<ReadingSession> currentReadingSessionOptional = readingSessionService.getCurrentReadingSessionOptional(loginAppUserId);
        if (currentReadingSessionOptional.isPresent()) {
            throw new ReadingSessionIsInProgressException(currentReadingSessionOptional.get().getBook().getBookId());
        }

        Integer startPage = book.getCurrentPage();
        AppUser appUser = new AppUser(loginAppUserId);
        ReadingSession newReadingSession = new ReadingSession(startPage, LocalDateTime.now(), book, appUser);
        readingSessionService.addReadingSession(newReadingSession);

        return book;
    }

    @PutMapping("{sessionId}")
    public UpdateSuccessResponse updateReadtime(@PathVariable("sessionId") Long readingSessionId,
                                                @RequestParam(value = "time") Integer readTime
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();

        Optional<ReadingSession> readingSessionOptional = readingSessionService.getReadingSessionByReadingSessionId(readingSessionId);
        if (readingSessionOptional.isEmpty()) {
            throw new NotFoundException("독서활동을 찾을 수 없어요");
        }

        if (!readingSessionOptional.get().getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException("해당 독서활동을 수정할 권한이 없어요");
        }

        ReadingSession readingSession = readingSessionOptional.get();
        readingSession.setReadTime(readTime);

        readingSessionService.updateReadingSession(readingSession);

        return new UpdateSuccessResponse("독서활동의 시간을 업데이트했어요");
    }

    @Transactional
    @PutMapping("{bookId}/end")
    public AddSucessResponse endReadingSession(@PathVariable("bookId") Long bookId,
                                               @RequestParam("page") Integer readingSessionEndPage,
                                               @RequestParam("time") Integer totalTimeInSecond
    ) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();
        ReadingSession previousReadingSession = readingSessionService.getCurrentReadingSession(loginUserId);

        if (book.getCurrentPage() >= readingSessionEndPage) {
            throw new BadRequestException("독서활동 페이지가 책의 마지막 페이지보다 커요");
        }

        previousReadingSession.setEndPage(readingSessionEndPage);
        previousReadingSession.setEndTime(LocalDateTime.now());
        previousReadingSession.setReadTime(totalTimeInSecond / 60);
        readingSessionService.updateReadingSession(previousReadingSession);

        book.setCurrentPage(readingSessionEndPage);
        bookService.editBook(book);

        return new AddSucessResponse("독서활동을 종료했어요");
    }

    @DeleteMapping("{readingSessionId}")
    public DeleteSuccessResponse deleteReadingSession(@PathVariable("readingSessionId") Long readingSessionId) {
        Optional<ReadingSession> readingSessionOptional = readingSessionService.getReadingSessionByReadingSessionId(readingSessionId);
        if (readingSessionOptional.isEmpty()) {
            throw new NotFoundException("지우실려는 독서활동이 없어요");
        }

        Long loginUserId = AppUserService.getLoginAppUserId();
        Long readingSessionAppUserId = readingSessionOptional.get().getBook().getAppUser().getAppUserId();
        if (!loginUserId.equals(readingSessionAppUserId)) {
            throw new NotAuthorizeException("독서활동을 지우실 권한이 없어요");
        }

        readingSessionService.deleteReadingSession(readingSessionId);

        return new DeleteSuccessResponse("독서활동을 지웠어요");
    }
}
