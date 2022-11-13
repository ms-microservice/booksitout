package com.jinkyumpark.bookitout.readingsession;

import com.jinkyumpark.bookitout.book.Book;
import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.response.AddSucessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@RestController
@RequestMapping("v1/reading-session")
public class ReadingSessionControllerV1 {
    private final ReadingSessionService readingSessionService;
    private final BookService bookService;

    private final String BOOK_NOT_FOUND_MESSAGE = "해당 id의 책이 없어요";

    @GetMapping("{reading-session-id}")
    public ReadingSession getReadingSession(@PathVariable("reading-session-id") Long readingSessionId) {
        Optional<ReadingSession> readingSessionOptional = readingSessionService.getReadingSessionByReadingSessionId(readingSessionId);
        if (readingSessionOptional.isEmpty()) {
            throw new NotFoundException("찾으시는 독서활동이 없어요");
        }

        return readingSessionOptional.get();
    }

    @GetMapping
    public List<ReadingSession> getReadingSessionByBookId(@RequestParam("book") Long bookId) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Optional<Book> bookOptional = bookService.getBookById(bookId);
        if (bookOptional.isEmpty()) {
            throw new NotFoundException(BOOK_NOT_FOUND_MESSAGE);
        }

        Long bookAppUserId = bookOptional.get().getAppUser().getAppUserId();

        if (!loginUserId.equals(bookAppUserId) && !bookOptional.get().getIsSharing()) {
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
        if (! loginUserId.equals(requestAppUserId)) {
            throw new NotAuthorizeException("해당 유저의 독서활동을 조회할 권한이 없어요");
        }

        Pageable pageRequest = PageRequest.of(page, size);
        List<ReadingSession> recentReadingSessionList = readingSessionService.getRecentReadingSessions(requestAppUserId, pageRequest);

        return recentReadingSessionList;
    }

    @PostMapping("{bookId}")
    public AddSucessResponse startReadingSession(@PathVariable("bookId") Long bookId) {
        Optional<Book> bookOptional = bookService.getBookById(bookId);
        if (bookOptional.isEmpty()) {
            throw new NotFoundException(BOOK_NOT_FOUND_MESSAGE);
        }

        Long loginAppUserId = AppUserService.getLoginAppUserId();
        if (!loginAppUserId.equals(bookOptional.get().getAppUser().getAppUserId())) {
            throw new BookNotSharingException("독서활동을 추가하시려는 책의 주인이 아니에요");
        }

        Optional<ReadingSession> previousReadingSessionOptional = readingSessionService.getPreviousReadingSession(bookId);
        if (previousReadingSessionOptional.isPresent() && previousReadingSessionOptional.get().getEndPage() == null) {
            throw new IllegalStateException("아직 진행중이신 독서활동이 있어요. 전의 독서활동을 먼저 끝내 주세요");
        }

        Integer startPage = previousReadingSessionOptional.isEmpty() ? 0 : previousReadingSessionOptional.get().getEndPage();
        ReadingSession newReadingSession = new ReadingSession(startPage, LocalDateTime.now(), bookOptional.get());

        readingSessionService.addReadingSession(newReadingSession);

        return new AddSucessResponse("독서활동을 추가했어요");
    }

    @PutMapping("{bookId}/end")
    public AddSucessResponse endReadingSession(@PathVariable("bookId") Long bookId, @RequestParam("page") Integer readingSessionEndPage) {
        Optional<Book> bookOptional = bookService.getBookById(bookId);
        if (bookOptional.isEmpty()) {
            throw new NotFoundException("없는 책이에요");
        }

        Optional<ReadingSession> previousReadingSession = readingSessionService.getPreviousReadingSession(bookId);
        if (previousReadingSession.isEmpty()) {
            throw new NotFoundException("끝내시려는 독서활동이 없어요");
        }

        ReadingSession updatedReadingSession = previousReadingSession.get();
        if (bookOptional.get().getEndPage() < readingSessionEndPage) {
            throw new BadRequestException("독서활동 페이지가 책의 마지막 페이지보다 커요");
        }
        updatedReadingSession.setEndPage(readingSessionEndPage);
        updatedReadingSession.setEndTime(LocalDateTime.now());

        readingSessionService.updateReadingSession(updatedReadingSession);

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
