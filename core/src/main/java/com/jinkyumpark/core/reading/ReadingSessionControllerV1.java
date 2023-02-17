package com.jinkyumpark.core.reading;

import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.book.BookService;
import com.jinkyumpark.core.reading.dto.ReadingSessionDto;
import com.jinkyumpark.core.reading.request.ReadingAddRequest;
import com.jinkyumpark.core.reading.request.ReadingEditRequest;
import com.jinkyumpark.core.user.login.LoginAppUser;
import com.jinkyumpark.core.user.login.LoginUser;
import com.jinkyumpark.core.common.exception.http.NotAuthorizeException;
import com.jinkyumpark.core.common.exception.http.NotFoundException;
import com.jinkyumpark.core.book.exception.BookNotSharingException;
import com.jinkyumpark.core.common.response.DeleteSuccessResponse;
import com.jinkyumpark.core.common.response.EditSuccessResponse;
import com.jinkyumpark.core.common.response.UpdateSuccessResponse;
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

        Integer startPage = book.getCurrentPage() == 0 ? 0 : book.getCurrentPage() + 1;
        ReadingSessionDto readingSessionDto = ReadingSessionDto.builder()
                .startPage(startPage)
                .startTime(LocalDateTime.now())
                .bookId(bookId)
                .appUserId(loginAppUser.getId())
                .build();

        readingSessionService.addReadingSession(readingSessionDto, loginAppUser);
        return book;
    }

    @PostMapping("{bookId}")
    public ResponseEntity<String> addReadingSession(@PathVariable("bookId") Long bookId,
                                                    @Valid @RequestBody ReadingAddRequest readingAddRequest,
                                                    @LoginUser LoginAppUser loginAppUser) {
        ReadingSessionDto readingSessionDto = ReadingSessionDto.builder()
                .startPage(readingAddRequest.getStartPage())
                .endPage(readingAddRequest.getEndPage())
                .startTime(readingAddRequest.getStartDate().atStartOfDay())
                .endTime(readingAddRequest.getStartDate().atStartOfDay())
                .readTime(readingAddRequest.getReadTime())
                .appUserId(loginAppUser.getId())
                .bookId(bookId)
                .build();

        readingSessionService.addReadingSession(readingSessionDto, loginAppUser);

        return new ResponseEntity<>("added", HttpStatus.CREATED);
    }

    @PutMapping("{sessionId}")
    public UpdateSuccessResponse updateReadTime(@PathVariable("sessionId") Long readingSessionId,
                                                @RequestParam(value = "time") Integer readTime,
                                                @LoginUser LoginAppUser loginAppUser) {

        ReadingSessionDto readingSessionDto = ReadingSessionDto.builder()
                .readTime(readTime)
                .build();

        readingSessionService.updateReadingSession(readingSessionId, readingSessionDto, loginAppUser);

        return new UpdateSuccessResponse(String.format("PUT v1/reading-session/%d", readingSessionId), messageSource.getMessage("reading.edit.read-time.success"));
    }

    @PutMapping("{bookId}/end")
    public EditSuccessResponse endReadingSession(@PathVariable("bookId") Long bookId,
                                                @RequestParam("page") Integer readingSessionEndPage,
                                                @RequestParam("time") Integer totalTimeInSecond,
                                                @LoginUser LoginAppUser loginAppUser) {
        ReadingSessionDto readingSessionDto = ReadingSessionDto.builder()
                .endPage(readingSessionEndPage)
                .readTime(totalTimeInSecond / 60)
                .endTime(LocalDateTime.now())
                .bookId(bookId)
                .appUserId(loginAppUser.getId())
                .build();

        readingSessionService.endCurrentReadingSession(readingSessionDto, loginAppUser);

        return new EditSuccessResponse("독서활동을 종료했어요");
    }

    @PutMapping("{readingSessionId}/all")
    public EditSuccessResponse editReadingSession(@PathVariable("readingSessionId") Long readingSessionId,
                                                  @RequestBody @Valid ReadingEditRequest readingEditRequest,
                                                  @LoginUser LoginAppUser loginAppUser) {
        ReadingSessionDto readingSessionDto = ReadingSessionDto.builder()
                .startTime(readingEditRequest.getStartTime())
                .endTime(readingEditRequest.getEndTime())
                .readTime(readingEditRequest.getReadTime())
                .endPage(readingEditRequest.getEndPage())
                .build();

        readingSessionService.updateReadingSession(readingSessionId, readingSessionDto, loginAppUser);

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