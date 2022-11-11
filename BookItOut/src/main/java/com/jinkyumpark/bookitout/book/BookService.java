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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public Book getBookById(Long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isEmpty()) {
            throw new NotFoundException("해당 id의 책은 존재하지 않아요");
        }

        return bookOptional.get();
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

    public List<Book> getAllBook(Long loginUserId) {
        return bookRepository.findAllByAppUser_AppUserId(loginUserId);
    }

    public List<Book> getAllDoneBook(Long loginUserId) {
        return bookRepository.findAllDoneBook(loginUserId);
    }

    public List<Book> getAllNotDoneBook(Long loginUserId) {
        return bookRepository.findAllNotDoneBook(loginUserId);
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
        Optional<Book> bookOptional = bookRepository.findById(editedBook.getBookId());

        if (bookOptional.isEmpty()) {
            throw new NotFoundException("수정하실려는 책이 없어요");
        }

        Book bookToEdit = bookOptional.get();
        if (editedBook.getTitle() != null) {
            bookToEdit.setTitle(editedBook.getTitle());
        }
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
