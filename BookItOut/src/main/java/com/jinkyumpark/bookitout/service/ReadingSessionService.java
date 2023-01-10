package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.model.ReadingSession;
import com.jinkyumpark.bookitout.repository.BookRepository;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.model.goal.Goal;
import com.jinkyumpark.bookitout.model.statistics.MonthStatistics;
import com.jinkyumpark.bookitout.repository.ReadingSessionRepository;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.user.LoginUser;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.custom.ReadingSessionIsInProgressException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

import static java.time.temporal.ChronoUnit.DAYS;

@RequiredArgsConstructor
@Service
public class ReadingSessionService {
    private final MessageSourceAccessor messageSource;
    private final ReadingSessionRepository readingSessionRepository;
    private final BookService bookService;
    private final StatisticsService statisticsService;
    private final GoalService goalService;

    public List<Integer> getReadTimeByDateRange(Long appUserId,
                                                LocalDateTime startDate,
                                                LocalDateTime endDate) {
        List<ReadingSession> readingSessionList = readingSessionRepository.findAllByAppUser_AppUserIdAndStartTimeBetween(appUserId, startDate, endDate);

        Map<Integer, Integer> readTimeMap = new HashMap<>();
        for (ReadingSession readingSession : readingSessionList) {
            readTimeMap.merge(readingSession.getStartTime().getDayOfYear(), readingSession.getReadTime() == null ? 0 : readingSession.getReadTime(), Integer::sum);
        }

        List<Integer> readTimeList = new ArrayList<>();
        for (int i = 0; i <= DAYS.between(startDate, endDate); i++) {
            int key = startDate.plusDays(i).getDayOfYear();
            readTimeList.add(readTimeMap.getOrDefault(key, 0));
        }

        return readTimeList;
    }

    public List<ReadingSession> getReadingSessionByBookId(Long bookId) {
        return readingSessionRepository.findAllByBook_BookId(bookId);
    }

    public ReadingSession getCurrentReadingSession(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("reading.get.current.fail.not-found")));
    }

    public Optional<ReadingSession> getCurrentReadingSessionOptional(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId);
    }

    public Optional<ReadingSession> getReadingSessionOptionalByReadingSessionId(Long readingSessionId) {
        return readingSessionRepository.findById(readingSessionId);
    }

    public List<ReadingSession> getRecentReadingSessions(Long appUserId, Pageable pageRequest) {
        return readingSessionRepository.findAllRecentReadingSession(appUserId, pageRequest);
    }

    @Transactional
    public void addReadingSession(ReadingSession newReadingSession, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, newReadingSession.getBook().getBookId());
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), newReadingSession.getStartTime().getYear(), newReadingSession.getStartTime().getMonthValue());
        Goal goal = goalService.getGoalByYear(newReadingSession.getStartTime().getYear(), loginAppUser);

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId()))
            throw new NotAuthorizeException("독서활동을 추가하시려는 책의 주인이 아니에요");
        if (!newReadingSession.getStartPage().equals(book.getCurrentPage() + 1) && book.getCurrentPage() != 0)
            throw new BadRequestException("독서활동 시작 페이지는 바로 전 독서활동 페이지 바로 뒤여야만 해요");
        Optional<ReadingSession> currentReadingSessionOptional = this.getCurrentReadingSessionOptional(loginAppUser.getId());
        if (currentReadingSessionOptional.isPresent())
            throw new ReadingSessionIsInProgressException(currentReadingSessionOptional.get().getBook().getBookId());
        if (newReadingSession.getEndPage() != null && newReadingSession.getEndPage() > book.getEndPage())
            throw new BadRequestException("독서활동 페이지는 책 마지막 페이지보다 클 수 없어요");
        if (newReadingSession.getEndPage() != null && newReadingSession.getEndPage() < 0 || newReadingSession.getStartPage() < 0)
            throw new BadRequestException("독서활동 페이지는 반드시 0보다 커야 해요");

        readingSessionRepository.save(newReadingSession);

        if (newReadingSession.getReadTime() == null && newReadingSession.getEndPage() == null)
            return;

        book.addReadingSession(newReadingSession);
        monthStatistics.addReadingSession(newReadingSession);
        goal.addReadingSession(newReadingSession, book);
    }

    @Transactional
    public void updateReadingSession(ReadingSession updatedReadingSession, LoginAppUser loginAppUser) {
        ReadingSession previousReadingSession = readingSessionRepository.findById(updatedReadingSession.getReadingSessionId())
                .orElseThrow(() -> new NotFoundException("찾을 수 없어요"));

        if (!previousReadingSession.getAppUser().getAppUserId().equals(loginAppUser.getId()))
            throw new NotAuthorizeException("해당 독서활동을 수정할 권한이 없어요");
        if (previousReadingSession.getEndPage() != null && updatedReadingSession.getEndPage() != null && updatedReadingSession.getEndPage() <= previousReadingSession.getStartPage() && previousReadingSession.getStartPage() != 0)
            throw new BadRequestException("그 전 독서활동보다 적은 페이지에요");
        if (previousReadingSession.getEndPage() != null && previousReadingSession.getBook().getEndPage() < previousReadingSession.getEndPage())
            throw new BadRequestException("책의 마지막 페이지보다 커요");
        if (!previousReadingSession.getBook().getCurrentPage().equals(previousReadingSession.getEndPage()) && previousReadingSession.getEndPage() != null)
            throw new BadRequestException("가장 최근의 독서활동만 수정할 수 있어요");

        Book book = bookService.getBookById(loginAppUser, previousReadingSession.getBook().getBookId());
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), previousReadingSession.getStartTime().getYear(), previousReadingSession.getStartTime().getMonthValue());

        book.updateReadingSession(updatedReadingSession);
        monthStatistics.updateReadingSession(previousReadingSession, updatedReadingSession, book);
        previousReadingSession.updateReadingSession(updatedReadingSession);

        if (updatedReadingSession.getEndPage() != null &&
                updatedReadingSession.getEndPage().equals(book.getEndPage())
        ) {
            Integer readingSessionYear = updatedReadingSession.getStartTime() == null ? previousReadingSession.getStartTime().getYear() : updatedReadingSession.getStartTime().getYear();
            Goal goal = goalService.getGoalByYear(readingSessionYear, loginAppUser);
            goal.bookDone();
        }
    }

    @Transactional
    public void deleteReadingSession(Long readingSessionId, LoginAppUser loginAppUser) {
        ReadingSession readingSession = this.getReadingSessionOptionalByReadingSessionId(readingSessionId)
                .orElseThrow(() -> new NotFoundException("지우실려는 독서활동이 없어요"));
        Long readingSessionAppUserId = readingSession.getBook().getAppUser().getAppUserId();

        if (!loginAppUser.getId().equals(readingSessionAppUserId))
            throw new NotAuthorizeException("독서활동을 지우실 권한이 없어요");
        if (readingSession.getEndPage() != null && !readingSession.getEndPage().equals(readingSession.getBook().getCurrentPage()))
            throw new BadRequestException("가장 최근의 독서활동만 지우실 수 있어요");

        readingSessionRepository.deleteById(readingSessionId);

        Book book = readingSession.getBook();
        MonthStatistics statistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), readingSession.getStartTime().getYear(), readingSession.getStartTime().getMonthValue());
        Goal goal = goalService.getGoalByYear(readingSession.getStartTime().getYear(), loginAppUser);

        goal.deleteReadingSession(readingSession, book);
        statistics.deleteReadingSession(readingSession, book);
        book.deleteReadingSession(readingSession);
    }
}
