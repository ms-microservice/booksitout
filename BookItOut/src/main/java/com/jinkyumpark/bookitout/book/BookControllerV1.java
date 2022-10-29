package com.jinkyumpark.bookitout.book;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/book")
public class BookControllerV1 {
    private BookService bookService;

    @GetMapping("{id}")
    public Book getBookById(@PathVariable("id") Long id) {
        Optional<Book> bookOptional = bookService.getBookById(id);

        if (bookOptional.isEmpty()) {
            throw new IllegalStateException("해당 id의 책은 존재하지 않아요");
        }

        return bookOptional.get();
    }
}
