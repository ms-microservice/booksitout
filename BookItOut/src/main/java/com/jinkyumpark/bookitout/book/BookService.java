package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.readingsession.ReadingSession;
import com.jinkyumpark.bookitout.readingsession.ReadingSessionRepository;
import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class BookService {
    private BookRepository bookRepository;
    private ReadingSessionRepository readingSessionRepository;
    private AppUserService appUserService;

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
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
}
