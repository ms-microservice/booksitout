package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.app.book.BookRepository;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.app.user.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest(properties = {"spring.jpa.properties.javax.persistence.validation.mode=none"})
class BookRepositoryTest {

    @Autowired
    private BookRepository underTest;

    @Autowired
    private AppUserRepository appUserRepository;

    // Find All Books By AppUserId
    @Test
    void itShouldGetAllBooksByAppUserId() {
        // Given
        Long appUserId = 1L;
        AppUser appUser = new AppUser(appUserId, "test", "test");
        appUserRepository.save(appUser);

        Book book1 = new Book("test title 1", 0, appUser);
        Book book2 = new Book("test title 2", 0, appUser);
        Book book3 = new Book("test title 3", 0, appUser);
        List<Book> testBookList = List.of(book1, book2, book3);

        // When
        underTest.saveAll(testBookList);
        List<Book> resultBookList = underTest.findAllBooksByAppUserId(appUserId, Pageable.unpaged());

        // Then
        assertThat(resultBookList)
                .hasSize(3)
                .containsAll(testBookList);
    }
    @Test
    void itShouldNotGetBooksWhenItIsNotBelongToAppUser() {
        // Given
        Long targetAppUserId = 1L;
        Long fakeAppUserId = 2L;
        AppUser targetAppUser = new AppUser(targetAppUserId, "test 1", "test");
        AppUser fakeAppUser = new AppUser(fakeAppUserId, "test 2", "test");
        appUserRepository.saveAll(List.of(targetAppUser, fakeAppUser));

        Book validBook1 = new Book("test title 1", 0, targetAppUser);
        Book validBook2 = new Book("test title 2", 0, targetAppUser);
        Book invalidBook1 = new Book("test title 3", 0, fakeAppUser);
        Book invalidBook2 = new Book("test title 4", 0, fakeAppUser);
        List<Book> testBookList = List.of(validBook1, validBook2, invalidBook1, invalidBook2);

        // When
        underTest.saveAll(testBookList);
        List<Book> resultBookList = underTest.findAllBooksByAppUserId(targetAppUserId, Pageable.unpaged());

        // Then
        assertThat(resultBookList)
                .hasSize(2)
                .containsAll(List.of(validBook1, validBook2));
    }

    // Find All Done Books

    // Find All Not Done Books

}