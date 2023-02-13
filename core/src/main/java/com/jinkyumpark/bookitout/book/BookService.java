package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.dto.BookDto;
import com.jinkyumpark.bookitout.book.exception.BookNotSharingException;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.settings.model.MyBookSearchRange;
import com.jinkyumpark.bookitout.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.reading.ReadingSessionRepository;
import com.jinkyumpark.bookitout.statistics.StatisticsService;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.common.exception.http.NotAuthorizeException;
import com.jinkyumpark.bookitout.common.exception.http.NotFoundException;
import com.jinkyumpark.bookitout.reading.ReadingSession;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookService {
    private final MessageSourceAccessor messageSource;
    private final BookRepository bookRepository;
    private final ReadingSessionRepository readingSessionRepository;
    private final StatisticsService statisticsService;

    private final BookRepositoryImpl bookRepositoryImpl;

    public Book getBookById(LoginAppUser loginAppUser, Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.get.fail.not-found")));

        if (!loginAppUser.getId().equals(book.getAppUser().getAppUserId())) {
            throw new BookNotSharingException(messageSource.getMessage("book.get.fail.not-sharing"));
        }

        return book;
    }

    public Book getLastBookByAppUserid(Long appUserId) {
        PageRequest pageRequest = PageRequest.of(0, 1);

        List<ReadingSession> readingSessionList = readingSessionRepository
                .findAllBookNotDoneReadingSession(appUserId, pageRequest);

        if (readingSessionList.size() < 1) {
            throw new NotFoundException(messageSource.getMessage("book.get.fail.last-reading-session.not-found"));
        }

        return readingSessionList.get(0).getBook();
    }

    public Page<Book> getAllBooks(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllBooks(loginUserId, pageRequest);
    }

    public Page<Book> getAllNotStartedBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllNotStartedBooks(loginUserId, pageRequest);
    }

    public Page<Book> getAllStartedBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllStartedBooks(loginUserId, pageRequest);
    }

    public Page<Book> getAllNotDoneBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllNotDoneBooks(loginUserId, pageRequest);
    }

    public Page<Book> getAllDoneBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllDoneBooks(loginUserId, pageRequest);
    }

    public Page<Book> getAllGiveUpBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllGiveUpBooks(loginUserId, pageRequest);
    }

    public Book getCurrentReadingSessionBook(Long loginUserId) {
        ReadingSession currentReadingSession = readingSessionRepository.getCurrentReadingSessionEager(loginUserId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.get.reading-session.fail.not-found")));

        return currentReadingSession.getBook();
    }

    public List<Book> getBookByQuery(Long loginUserId, String query, MyBookSearchRange myBookSearchRange) {

        if (myBookSearchRange.equals(MyBookSearchRange.ALL))
            return bookRepositoryImpl.getAllBookByQuery(loginUserId, query);
        if (myBookSearchRange.equals(MyBookSearchRange.ONLY_READING))
            return bookRepositoryImpl.getNotDoneBookByQuery(loginUserId, query);
        if (myBookSearchRange.equals(MyBookSearchRange.ONLY_DONE))
            return bookRepositoryImpl.getDoneBookByQuery(loginUserId, query);
        if (myBookSearchRange.equals(MyBookSearchRange.EXCLUDE_GIVE_UP))
            return bookRepositoryImpl.getExcludeGiveUpBookByQuery(loginUserId, query);

        return List.of();
    }

    public Long addBook(BookDto bookDto) {
        return bookRepository.save(bookDto.toEntity()).getBookId();
    }

    @Transactional
    public void giveUpBook(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.edit.fail.not-found")));

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException("book.edit.fail.not-authorize");
        }

        book.giveUpBook();

    }

    @Transactional
    public void unGiveUpBook(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.edit.fail.not-found")));

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException("book.edit.fail.not-authorize");
        }

        book.unGiveUpBook();
    }

    @Transactional
    public void editBook(Long bookId, BookDto bookDto, Long loginUserId) {
        Book bookToEdit = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("book.get.fail.not-found"));

        if (!loginUserId.equals(bookToEdit.getAppUser().getAppUserId()))
            throw new NotAuthorizeException(messageSource.getMessage("book.edit.fail.not-authorize"));

        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginUserId, bookToEdit.getCreatedDate().getYear(), bookToEdit.getCreatedDate().getMonthValue());

        bookToEdit.editBook(bookDto);
        monthStatistics.editBook(bookDto);
    }

    @Transactional
    public void deleteBookByBookId(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.delete.fail.not-found")));

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException(messageSource.getMessage("book.delete.fail.not-authorize"));
        }

        Optional<ReadingSession> lastReadingSession = readingSessionRepository.findFirstByBook_BookIdOrderByStartTimeDesc(bookId);
        int year = lastReadingSession.isPresent() ? lastReadingSession.get().getStartTime().getYear() : book.getCreatedDate().getYear();
        int month = lastReadingSession.isPresent() ? lastReadingSession.get().getStartTime().getMonthValue() : book.getCreatedDate().getMonthValue();
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginAppUser.getId(), year, month);

        monthStatistics.deleteBook(book);
        bookRepository.deleteById(book.getBookId());
    }
}