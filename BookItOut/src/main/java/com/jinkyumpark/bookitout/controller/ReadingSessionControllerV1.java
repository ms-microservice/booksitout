package com.jinkyumpark.bookitout.controller;

import com.jinkyumpark.bookitout.model.ReadingSession;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.service.BookService;
import com.jinkyumpark.bookitout.request.AddReadingSessionRequest;
import com.jinkyumpark.bookitout.request.ReadingSessionEditRequest;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.response.common.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.common.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.common.EditSuccessResponse;
import com.jinkyumpark.bookitout.response.common.UpdateSuccessResponse;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.AppUserService;
import com.jinkyumpark.bookitout.service.ReadingSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/reading-session")
public class ReadingSessionControllerV1 {
    private final MessageSourceAccessor messageSource;
    private final ReadingSessionService readingSessionService;
    private final BookService bookService;

    @GetMapping
    public ReadingSession getReadingSession(@RequestParam("reading-session-id") Long readingSessionId) {
        Optional<ReadingSession> readingSessionOptional = readingSessionService.getReadingSessionOptionalByReadingSessionId(readingSessionId);

        if (readingSessionOptional.isEmpty()) {
            throw new NotFoundException("찾으시는 독서활동이 없어요");
        }

        return readingSessionOptional.get();
    }

    @GetMapping("{bookId}")
    public List<ReadingSession> getReadingSessionByBookId(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);
        Long bookAppUserId = book.getAppUser().getAppUserId();

        if (!loginAppUser.getId().equals(bookAppUserId) && !book.getIsSharing()) {
            throw new BookNotSharingException(messageSource.getMessage("reading.get.fail.not-sharing"));
        }

        return readingSessionService.getReadingSessionByBookId(bookId);
    }

    @GetMapping("{userid}/all")
    public List<ReadingSession> getAllRecentReadingSessionByUserId(@PathVariable("userid") Long requestAppUserId,
                                                                   @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") Integer size,
                                                                   @LoginUser LoginAppUser loginAppUser) {
        if (!loginAppUser.getId().equals(requestAppUserId)) {
            throw new NotAuthorizeException(messageSource.getMessage("reading.get.fail.not-authorize"));
        }

        Pageable pageRequest = PageRequest.of(page, size);
        return readingSessionService.getRecentReadingSessions(requestAppUserId, pageRequest);
    }

    @GetMapping("current")
    public ReadingSession getCurrentReadingSession(@LoginUser LoginAppUser loginAppUser) {
        return readingSessionService.getCurrentReadingSession(loginAppUser.getId());
    }

    @PostMapping("{bookId}/start")
    public Book startReadingSession(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);

        Integer startPage = book.getCurrentPage() + 1;
        ReadingSession newReadingSession = ReadingSession.builder()
                .startPage(startPage)
                .startTime(LocalDateTime.now())
                .book(book)
                .appUser(new AppUser(loginAppUser.getId()))
                .build();

        readingSessionService.addReadingSession(newReadingSession, loginAppUser);
        return book;
    }

    @PostMapping("{bookId}")
    public ResponseEntity<String> addReadingSession(@PathVariable("bookId") Long bookId,
                                                    @Valid @RequestBody AddReadingSessionRequest addReadingSessionRequest,
                                                    @LoginUser LoginAppUser loginAppUser) {
        ReadingSession newReadingSession = ReadingSession.builder()
                .startPage(addReadingSessionRequest.getStartPage())
                .endPage(addReadingSessionRequest.getEndPage())
                .startTime(addReadingSessionRequest.getStartDate().atStartOfDay())
                .endTime(addReadingSessionRequest.getStartDate().atStartOfDay())
                .readTime(addReadingSessionRequest.getReadTime())
                .appUser(new AppUser(loginAppUser.getId()))
                .book(new Book(bookId))
                .build();

        readingSessionService.addReadingSession(newReadingSession, loginAppUser);

        return new ResponseEntity<>("added", HttpStatus.CREATED);
    }

    @PutMapping("{sessionId}")
    public UpdateSuccessResponse updateReadTime(@PathVariable("sessionId") Long readingSessionId,
                                                @RequestParam(value = "time") Integer readTime,
                                                @LoginUser LoginAppUser loginAppUser
    ) {
        ReadingSession updatedReadingSession = ReadingSession.builder()
                .readingSessionId(readingSessionId)
                .readTime(readTime)
                .build();

        readingSessionService.updateReadingSession(updatedReadingSession, loginAppUser);

        return new UpdateSuccessResponse(String.format("PUT v1/reading-session/%d", readingSessionId), messageSource.getMessage("reading.edit.read-time.success"));
    }

    @PutMapping("{bookId}/end")
    public AddSuccessResponse endReadingSession(@PathVariable("bookId") Long bookId,
                                                @RequestParam("page") Integer readingSessionEndPage,
                                                @RequestParam("time") Integer totalTimeInSecond,
                                                @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();
        ReadingSession previousReadingSession = readingSessionService.getCurrentReadingSession(loginUserId);

        ReadingSession updatedReadingSession = ReadingSession.builder()
                .readingSessionId(previousReadingSession.getReadingSessionId())
                .endPage(readingSessionEndPage)
                .endTime(LocalDateTime.now())
                .readTime(totalTimeInSecond / 60)
                .startPage(book.getCurrentPage() + 1)
                .endPage(readingSessionEndPage)
                .build();

        readingSessionService.updateReadingSession(updatedReadingSession, loginAppUser);

        return new AddSuccessResponse("독서활동을 종료했어요");
    }

    @PutMapping("{readingSessionId}/all")
    public EditSuccessResponse editReadingSession(@PathVariable("readingSessionId") Long readingSessionId,
                                                  @RequestBody @Valid ReadingSessionEditRequest readingSessionEditRequest,
                                                  @LoginUser LoginAppUser loginAppUser) {
        ReadingSession updatedReadingSession = ReadingSession.builder()
                .readingSessionId(readingSessionId)
                .startTime(readingSessionEditRequest.getStartTime())
                .endTime(readingSessionEditRequest.getEndTime())
                .readTime(readingSessionEditRequest.getReadTime())
                .endPage(readingSessionEditRequest.getEndPage())
                .build();

        readingSessionService.updateReadingSession(updatedReadingSession, loginAppUser);

        return new EditSuccessResponse(String.format("PUT /v1/reading-session/%d", readingSessionId), messageSource.getMessage("reading.edit.manual.success"));
    }

    @DeleteMapping("not-saving")
    public DeleteSuccessResponse deleteReadingSessionWithoutSaving(@LoginUser LoginAppUser loginAppUser) {
        ReadingSession currentReadingSession = readingSessionService.getCurrentReadingSession(loginAppUser.getId());
        readingSessionService.deleteReadingSession(currentReadingSession.getReadingSessionId(), loginAppUser);

        return new DeleteSuccessResponse("DELETE v1/reading-session/not-saving");
    }

    @DeleteMapping("{readingSessionId}")
    public DeleteSuccessResponse deleteReadingSession(@PathVariable("readingSessionId") Long readingSessionId, @LoginUser LoginAppUser loginAppUser) {
        readingSessionService.deleteReadingSession(readingSessionId, loginAppUser);

        return new DeleteSuccessResponse(String.format("DELETE v1/reading-session/%d", readingSessionId), messageSource.getMessage("reading.delete.manual.success"));
    }
}
