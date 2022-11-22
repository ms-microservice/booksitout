package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.common.NotLoginException;
import com.jinkyumpark.bookitout.readingsession.ReadingSession;
import com.jinkyumpark.bookitout.readingsession.ReadingSessionRepository;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.AppUserRepository;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BookService {
    private BookRepository bookRepository;
    private ReadingSessionRepository readingSessionRepository;
    private AppUserRepository appUserRepository;

    public Optional<Book> getBookById(Long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);

        return bookOptional;
    }

    public Optional<Book> getLastBookByUserid(Long appUserId) {
        Optional<ReadingSession> readingSessionOptional = readingSessionRepository
                .findTopByAppUser_AppUserIdOrderByEndTimeDesc(appUserId);

        if (readingSessionOptional.isEmpty()) {
            return Optional.empty();
        }

        Book userBook = readingSessionOptional.get().getBook();
        return Optional.of(userBook);
    }

    public List<Book> getAllBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllBooksByAppUserId(loginUserId, pageRequest);
    }

    public List<Book> getAllDoneBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllDoneBooks(loginUserId, pageRequest);
    }

    public List<Book> getAllNotDoneBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllNotDoneBooks(loginUserId, pageRequest);
    }

    public void addBook(Book book, Long loginUserId) {
        Optional<AppUser> loginAppUser = appUserRepository.findById(loginUserId);
        if (loginAppUser.isEmpty()) {
            throw new NotLoginException();
        }

        book.setAppUser(loginAppUser.get());

        bookRepository.save(book);
    }

    @Transactional
    public void editBook(Book editedBook) {
        Optional<Book> bookOptional = Optional.ofNullable(bookRepository.findById(editedBook.getBookId())
                .orElseThrow(() -> new NotFoundException("수정하실려는 책이 없어요")));

        Book bookToEdit = bookOptional.get();
        if (editedBook.getTitle() != null) {
            bookToEdit.setTitle(editedBook.getTitle());
        }
        bookToEdit.setLanguage(editedBook.getLanguage());
        if (editedBook.getCover() != null) {
            bookToEdit.setCover(editedBook.getCover());
        }
        if (editedBook.getSummary() != null) {
            bookToEdit.setCover(editedBook.getCover());
        }
        if (editedBook.getSource() != null) {
            bookToEdit.setSource(editedBook.getSource());
        }
        if (editedBook.getReview() != null) {
            bookToEdit.setReview(editedBook.getReview());
        }
        if (editedBook.getIsSharing() != null) {
            bookToEdit.setIsSharing(editedBook.getIsSharing());
        }
        if (editedBook.getCurrentPage() != null) {
            bookToEdit.setCurrentPage(editedBook.getCurrentPage());
        }
    }

    public void deleteBookById(Long id) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isEmpty()) {
            throw new NotFoundException("삭제하시려는 책이 없어요. 다시 확인해 주새요");
        }

        if (!Objects.equals(bookOptional.get().getAppUser().getAppUserId(), loginUserId)) {
            throw new NotAuthorizeException("해당 책을 삭제하실 권한이 없어요");
        }

        bookRepository.deleteById(bookOptional.get().getBookId());
    }
}