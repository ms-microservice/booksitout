package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.repository.ReadingSessionRepository;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.model.ReadingSession;
import com.jinkyumpark.bookitout.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {
    private final MessageSourceAccessor messageSource;
    private final BookRepository bookRepository;
    private final ReadingSessionRepository readingSessionRepository;

    public Book getBookById(LoginAppUser loginAppUser, Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.get.fail.not-found")));

        if (!loginAppUser.getId().equals(book.getAppUser().getAppUserId())) {
            throw new NotAuthorizeException(messageSource.getMessage("book.get.fail.not-authorize"));
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

    public void addBook(Book book) {
        bookRepository.save(book);
    }

    @Transactional
    public void giveUpUnGiveUpBook(Long bookId, boolean giveUpState, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.edit.fail.not-found")));

        if (! book.getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException("book.edit.fail.not-authorize");
        }

        if (giveUpState) book.giveUpBook();
        else book.unGiveUpBook();
    }

    @Transactional
    public void editBook(Long loginUserId, Book editedBook) {
        Book bookToEdit = bookRepository.findById(editedBook.getBookId())
                .orElseThrow(() -> new NotFoundException("book.get.fail.not-found"));

        if (!loginUserId.equals(bookToEdit.getAppUser().getAppUserId()))
            throw new NotAuthorizeException(messageSource.getMessage("book.edit.fail.not-authorize"));

        if (editedBook.getTitle() != null)
            bookToEdit.setTitle(editedBook.getTitle());
        if (editedBook.getLanguage() != null)
            bookToEdit.setLanguage(editedBook.getLanguage());
        if (editedBook.getCover() != null)
            bookToEdit.setCover(editedBook.getCover());
        if (editedBook.getSummary() != null)
            bookToEdit.setCover(editedBook.getCover());
        if (editedBook.getSource() != null)
            bookToEdit.setSource(editedBook.getSource());
        if (editedBook.getReview() != null)
            bookToEdit.setReview(editedBook.getReview());
        if (editedBook.getIsSharing() != null)
            bookToEdit.setIsSharing(editedBook.getIsSharing());
        if (editedBook.getCurrentPage() != null)
            bookToEdit.setCurrentPage(editedBook.getCurrentPage());
        if (editedBook.getEndPage() != null)
            bookToEdit.setEndPage(editedBook.getEndPage());
    }

    @Transactional
    public void deleteBookByBookId(Long bookId, LoginAppUser loginAppUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("book.delete.fail.not-found")));

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException(messageSource.getMessage("book.delete.fail.not-authorize"));
        }

        bookRepository.deleteById(book.getBookId());
    }
}