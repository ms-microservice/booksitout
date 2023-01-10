package com.jinkyumpark.bookitout.app.readingsession;

import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.book.BookService;
import com.jinkyumpark.bookitout.app.goal.Goal;
import com.jinkyumpark.bookitout.app.goal.GoalService;
import com.jinkyumpark.bookitout.app.readingsession.request.AddReadingSessionRequest;
import com.jinkyumpark.bookitout.app.readingsession.request.ReadingSessionEditRequest;
import com.jinkyumpark.bookitout.app.statistics.StatisticsService;
import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.app.user.LoginAppUser;
import com.jinkyumpark.bookitout.app.user.LoginUser;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.exception.custom.ReadingSessionIsInProgressException;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.response.UpdateSuccessResponse;
import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.apache.tomcat.jni.Local;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/reading-session")
public class ReadingSessionControllerV1 {
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

    @PostMapping("{bookId}/start")
    public Book startReadingSession(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);

        Integer startPage = book.getCurrentPage();
        AppUser appUser = new AppUser(loginAppUser.getId());
        ReadingSession newReadingSession = ReadingSession.builder()
                .startPage(startPage + 1)
                .startTime(LocalDateTime.now())
                .book(book)
                .appUser(appUser)
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
        Long loginUserId = AppUserService.getLoginAppUserId();
        ReadingSession updatedReadingSession = ReadingSession.builder()
                .readingSessionId(readingSessionId)
                .readTime(readTime)
                .build();

        readingSessionService.updateReadingSession(updatedReadingSession, loginAppUser);

        return new UpdateSuccessResponse(String.format("PUT v1/reading-session/%d", readingSessionId), "독서활동의 시간을 업데이트했어요");
    }

    @PutMapping("{bookId}/end")
    public AddSuccessResponse endReadingSession(@PathVariable("bookId") Long bookId,
                                                @RequestParam("page") Integer readingSessionEndPage,
                                                @RequestParam("time") Integer totalTimeInSecond,
                                                @LoginUser LoginAppUser loginAppUser
    ) {
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
                                                  @LoginUser LoginAppUser loginAppUser
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        ReadingSession updatedReadingSession = ReadingSession.builder()
                .readingSessionId(readingSessionId)
                .startTime(readingSessionEditRequest.getStartTime())
                .endTime(readingSessionEditRequest.getEndTime())
                .readTime(readingSessionEditRequest.getReadTime())
                .endPage(readingSessionEditRequest.getEndPage())
                .build();

        readingSessionService.updateReadingSession(updatedReadingSession, loginAppUser);

        return new EditSuccessResponse(String.format("PUT /v1/reading-session/%d", readingSessionId), "success");
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

        return new DeleteSuccessResponse(String.format("DELETE v1/reading-session/%d", readingSessionId), "독서활동을 지웠어요");
    }
}
