package com.jinkyumpark.reading;

import com.jinkyumpark.book.BookService;
import com.jinkyumpark.book.model.Book;
import com.jinkyumpark.common.exception.http.BadRequestException;
import com.jinkyumpark.common.exception.http.NotAuthorizeException;
import com.jinkyumpark.common.exception.http.NotFoundException;
import com.jinkyumpark.goal.GoalRepository;
import com.jinkyumpark.goal.GoalService;
import com.jinkyumpark.goal.model.Goal;
import com.jinkyumpark.goal.model.GoalId;
import com.jinkyumpark.reading.dto.ReadingSessionDto;
import com.jinkyumpark.reading.exception.ReadingSessionIsInProgressException;
import com.jinkyumpark.statistics.StatisticsService;
import com.jinkyumpark.statistics.model.MonthStatistics;
import com.jinkyumpark.user.login.LoginAppUser;
import lombok.RequiredArgsConstructor;
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
    private final StatisticsService statisticsService;
    private final GoalService goalService;
    private final BookService bookService;

    private final GoalRepository goalRepository;

    public List<Integer> getReadTimeByDateRange(Long appUserId, LocalDateTime startDate, LocalDateTime endDate) {
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

    public List<ReadingSession> getRecentReadingSessions(Long appUserId, Pageable pageRequest) {
        return readingSessionRepository.findAllRecentReadingSession(appUserId, pageRequest);
    }

    public ReadingSession getCurrentReadingSession(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("reading.get.current.fail.not-found")));
    }

    public ReadingSession getReadingSessionByReadingSessionId(Long readingSessionId) {
        return readingSessionRepository.findById(readingSessionId)
                .orElseThrow(() -> new NotFoundException("지우실려는 독서활동이 없어요"));
    }

    public Optional<ReadingSession> getCurrentReadingSessionOptional(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId);
    }

    public Optional<ReadingSession> getReadingSessionOptionalByReadingSessionId(Long readingSessionId) {
        return readingSessionRepository.findById(readingSessionId);
    }

    public Optional<ReadingSession> getLastReadingSessionOfBook(Long bookId) {
        return readingSessionRepository.findFirstByBook_BookIdOrderByStartTimeDesc(bookId);
    }

    @Transactional
    public void addReadingSession(ReadingSessionDto readingSessionDto, LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, readingSessionDto.getBookId());
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), readingSessionDto.getStartTime().getYear(), readingSessionDto.getStartTime().getMonthValue());
        Optional<ReadingSession> currentReadingSessionOptional = this.getCurrentReadingSessionOptional(loginAppUser.getId());

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId()))
            throw new NotAuthorizeException("독서활동을 추가하시려는 책의 주인이 아니에요");
        if (!readingSessionDto.getStartPage().equals(book.getCurrentPage() + 1) && book.getCurrentPage() != 0)
            throw new BadRequestException("독서활동 시작 페이지는 바로 전 독서활동 페이지 바로 뒤여야만 해요");
        if (currentReadingSessionOptional.isPresent())
            throw new ReadingSessionIsInProgressException(currentReadingSessionOptional.get().getBook().getBookId());
        if (readingSessionDto.getEndPage() != null && readingSessionDto.getEndPage() > book.getEndPage())
            throw new BadRequestException("독서활동 페이지는 책 마지막 페이지보다 클 수 없어요");
        if (readingSessionDto.getEndPage() != null && readingSessionDto.getEndPage() < 0 || readingSessionDto.getStartPage() < 0)
            throw new BadRequestException("독서활동 페이지는 반드시 0보다 커야 해요");
        if (readingSessionDto.getEndPage() != null && readingSessionDto.getEndPage() <= book.getCurrentPage())
            throw new BadRequestException("독서활동 끝 페이지는 그 전 독서활동보다 커야만 해요");

        readingSessionRepository.save(readingSessionDto.toEntity());
        book.addReadingSession(readingSessionDto);
        monthStatistics.addReadingSession(readingSessionDto, book);

        Optional<Goal> goal = goalRepository.findByGoalId(new GoalId(loginAppUser.getId(), readingSessionDto.getStartTime().getYear()));
        goal.ifPresent(value -> value.addReadingSession(readingSessionDto, book));
    }

    @Transactional
    public void updateReadingSession(Long readingSessionId, ReadingSessionDto readingSessionDto, LoginAppUser loginAppUser) {
        ReadingSession previousReadingSession = readingSessionRepository.findById(readingSessionId)
                .orElseThrow(() -> new NotFoundException("찾을 수 없어요"));

        if (!previousReadingSession.getAppUser().getAppUserId().equals(loginAppUser.getId()))
            throw new NotAuthorizeException("해당 독서활동을 수정할 권한이 없어요");
        if (previousReadingSession.getEndPage() != null && readingSessionDto.getEndPage() != null && readingSessionDto.getEndPage() <= previousReadingSession.getStartPage() && previousReadingSession.getStartPage() != 0)
            throw new BadRequestException("그 전 독서활동보다 적은 페이지에요");
        if (previousReadingSession.getEndPage() != null && previousReadingSession.getBook().getEndPage() < previousReadingSession.getEndPage())
            throw new BadRequestException("책의 마지막 페이지보다 커요");
        if (!previousReadingSession.getBook().getCurrentPage().equals(previousReadingSession.getEndPage()) && previousReadingSession.getEndPage() != null)
            throw new BadRequestException("가장 최근의 독서활동만 수정할 수 있어요");

        Book book = bookService.getBookById(loginAppUser, previousReadingSession.getBook().getBookId());
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), previousReadingSession.getStartTime().getYear(), previousReadingSession.getStartTime().getMonthValue());
        Integer readingSessionYear = readingSessionDto.getStartTime() == null ? previousReadingSession.getStartTime().getYear() : readingSessionDto.getStartTime().getYear();
        Goal goal = goalService.getGoalByYear(readingSessionYear, loginAppUser);

        book.updateReadingSession(readingSessionDto);
        monthStatistics.updateReadingSession(previousReadingSession, readingSessionDto, book);
        previousReadingSession.updateReadingSession(readingSessionDto);
        goal.updateReadingSession(readingSessionDto, book);
    }

    @Transactional
    public void endCurrentReadingSession(ReadingSessionDto readingSessionDto, LoginAppUser loginAppUser) {
        ReadingSession currentReadingSession = this.getCurrentReadingSession(loginAppUser.getId());
        Book book = bookService.getBookById(loginAppUser, currentReadingSession.getBook().getBookId());
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), currentReadingSession.getStartTime().getYear(), currentReadingSession.getStartTime().getMonthValue());
        Goal goal = goalService.getGoalByYear(currentReadingSession.getStartTime().getYear(), loginAppUser);

        if (currentReadingSession.getStartPage() > readingSessionDto.getEndPage()) throw new BadRequestException("그 전 독서활동보다 적은 페이지에요");
        if (readingSessionDto.getEndPage() > book.getEndPage()) throw new BadRequestException("책의 마지막 페이지보다 커요");

        currentReadingSession.updateReadingSession(readingSessionDto);
        book.updateReadingSession(readingSessionDto);
        monthStatistics.updateReadingSession(currentReadingSession, readingSessionDto, book);
        goal.updateReadingSession(readingSessionDto, book);
    }

    @Transactional
    public void deleteReadingSession(Long readingSessionId, LoginAppUser loginAppUser) {
        ReadingSession readingSession = this.getReadingSessionByReadingSessionId(readingSessionId);
        Book book = readingSession.getBook();
        MonthStatistics statistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), readingSession.getStartTime().getYear(), readingSession.getStartTime().getMonthValue());
        Goal goal = goalService.getGoalByYear(readingSession.getStartTime().getYear(), loginAppUser);

        if (!loginAppUser.getId().equals(readingSession.getBook().getAppUser().getAppUserId()))
            throw new NotAuthorizeException("독서활동을 지우실 권한이 없어요");
        if (readingSession.getEndPage() != null && !readingSession.getEndPage().equals(readingSession.getBook().getCurrentPage()))
            throw new BadRequestException("가장 최근의 독서활동만 지우실 수 있어요");

        readingSessionRepository.deleteById(readingSessionId);
        goal.deleteReadingSession(readingSession, book);
        statistics.deleteReadingSession(readingSession, book);
        book.deleteReadingSession(readingSession);
    }
}
