package com.jinkyumpark.core.book;

import com.jinkyumpark.common.exception.NoContentException;
import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import com.jinkyumpark.core.book.dto.BookDto;
import com.jinkyumpark.core.book.dto.MyBookSearchRange;
import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.book.model.book.BookRepository;
import com.jinkyumpark.core.book.model.customBook.BookCustom;
import com.jinkyumpark.core.book.model.customBook.BookCustomRepository;
import com.jinkyumpark.core.bookIsbn.BookIsbn;
import com.jinkyumpark.core.bookIsbn.BookIsbnDto;
import com.jinkyumpark.core.bookIsbn.BookIsbnRepository;
import com.jinkyumpark.core.common.feign.SearchClient;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.reading.ReadingSession;
import com.jinkyumpark.core.reading.ReadingSessionRepository;
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
    private final BookRepositoryQueryDsl bookRepositoryQueryDsl;
    private final BookIsbnRepository bookIsbnRepository;
    private final BookCustomRepository bookCustomRepository;
    private final SearchClient searchClient;

    public Book getBookById(LoginAppUser loginAppUser, Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.get.fail.not-found")));

        if (!loginAppUser.getId().equals(book.getAppUserId())) {
            throw new UnauthorizedException(messageSource.getMessage("book.get.fail.not-sharing"));
        }

        return book;
    }

    public Book getLastBookByAppUserId(Long appUserId) {
        PageRequest pageRequest = PageRequest.of(0, 1);

        List<ReadingSession> readingSessionList = readingSessionRepository
                .findAllBookNotDoneReadingSession(appUserId, pageRequest);

        if (readingSessionList.size() < 1) {
            throw new NotFoundException(messageSource.getMessage("book.get.fail.last-reading-session.not-found"));
        }

        return readingSessionList.get(0).getBook();
    }

    public Book getLastBookByAppUserIdThrowNoContent(Long appUserId) {
        PageRequest pageRequest = PageRequest.of(0, 1);

        List<ReadingSession> readingSessionList = readingSessionRepository
                .findAllBookNotDoneReadingSession(appUserId, pageRequest);

        if (readingSessionList.size() < 1) {
            throw new NoContentException(messageSource.getMessage("book.get.fail.last-reading-session.not-found"));
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
        if (query == null || query.isBlank()) {
            return List.of();
        }

        if (myBookSearchRange.equals(MyBookSearchRange.ALL))
            return bookRepositoryQueryDsl.getAllBookByQuery(loginUserId, query);
        if (myBookSearchRange.equals(MyBookSearchRange.ONLY_READING))
            return bookRepositoryQueryDsl.getNotDoneBookByQuery(loginUserId, query);
        if (myBookSearchRange.equals(MyBookSearchRange.ONLY_DONE))
            return bookRepositoryQueryDsl.getDoneBookByQuery(loginUserId, query);
        if (myBookSearchRange.equals(MyBookSearchRange.EXCLUDE_GIVE_UP))
            return bookRepositoryQueryDsl.getExcludeGiveUpBookByQuery(loginUserId, query);

        return List.of();
    }

    public List<Book> getAllBookByAppUserId(Long appUserId, Pageable pageable) {
        return bookRepository.findAllIsbnNotEmptyByAppUserId(appUserId, pageable);
    }

    public List<Book> getAllSharingBooksByAppUserId(Long appUserId, Pageable pageable) {
        return bookRepository.getAllSharingBooks(appUserId, pageable);
    }

    public Page<Book> getAllSharingBooksByAppUserIdPaged(Long appUserId, Pageable pageable) {
        return bookRepository.getAllSharingBooksPaged(appUserId, pageable);
    }

    public Long addBook(BookDto bookDto) {
        return bookRepository.save(bookDto.toBookEntity()).getBookId();
    }

    @Transactional
    public void giveUpBook(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.edit.fail.not-found")));

        if (!book.getAppUserId().equals(loginAppUser.getId())) {
            throw new UnauthorizedException("book.edit.fail.not-authorize");
        }

        book.giveUpBook();

    }

    @Transactional
    public void unGiveUpBook(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.edit.fail.not-found")));

        if (!book.getAppUserId().equals(loginAppUser.getId())) {
            throw new UnauthorizedException("book.edit.fail.not-authorize");
        }

        book.unGiveUpBook();
    }

    @Transactional
    public void editBook(Long bookId, BookDto bookDto, Long loginUserId) {
        Book bookToEdit = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("book.get.fail.not-found"));

        if (!loginUserId.equals(bookToEdit.getAppUserId()))
            throw new UnauthorizedException(messageSource.getMessage("book.edit.fail.not-authorize"));

        bookToEdit.editBook(bookDto);
    }

    @Transactional
    public void deleteBookByBookId(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.delete.fail.not-found")));

        if (!book.getAppUserId().equals(loginAppUser.getId())) {
            throw new UnauthorizedException(messageSource.getMessage("book.delete.fail.not-authorize"));
        }

        bookRepository.deleteById(book.getBookId());
    }

    public int getDoneBookCountByYear(Long appUserId, int year) {
        return bookRepositoryQueryDsl.getDoneBookCountByYear(appUserId, year);
    }

    @Transactional
    public Long addBookAndBookIsbn(BookDto bookDto, String isbn) {
        Long savedBookId = bookRepository.save(bookDto.toBookEntity()).getBookId();

        BookIsbnDto bookIsbnDto = BookIsbnDto.builder()
                .title(bookDto.getTitle())
                .author(bookDto.getAuthor())
                .cover(bookDto.getCover())
                .isbn(isbn)
                .build();

        bookIsbnRepository.save(bookIsbnDto.toEntity());

        return savedBookId;
    }

    @Transactional
    public Book addBookAndBookCustom(Book book, BookCustom bookCustom) {
        BookCustom savedBookCustom = null;
        if (bookCustom != null) {
            savedBookCustom = bookCustomRepository.save(bookCustom);
        }

        if (book.getBookIsbn() != null) {
            Optional<BookIsbn> byIsbn = bookIsbnRepository.findByIsbn(book.getBookIsbn().getIsbn());
            if (byIsbn.isEmpty()) {
                BookIsbn bookIsbn = searchClient.getNewBookByIsbnFromNaver(book.getBookIsbn().getIsbn()).toEntity();
                bookIsbnRepository.save(bookIsbn);
            }
        }

        return bookRepository.save(book.addBookCustom(savedBookCustom));
    }

    public List<Book> getAllDoneBookByYear(Long appUserId, int year, Pageable pageable) {
        return bookRepositoryQueryDsl.getDoneBookByYear(appUserId, year, pageable);
    }

}
